---
title: 'new relic'
excerpt: ''
coverImage: '/assets/covers/newrelic.jpg'
ogImage:
  url: '/assets/covers/newrelic.jpg'
---



# Browser Application
- You can create a New Relic `Browser Application` in the online GUI or you can do so via REST service


## Manually add New Relic Browser Monitoring
- View the documentation [here](https://docs.newrelic.com/docs/browser/browser-monitoring/installation/install-browser-monitoring-agent/)
- Steps:
  1. Go to one.newrelic.com, select Browser, and then select `Add more data` button.
  2. Under the `Browser metrics` section click the `New Relic Browser` button.
  3. Select the account & continue
  4. Make sure you select the `Copy/Paste Javascript code` radio button
  5. For step #3 select `No. (Name your standalone app)` and give you application a name
  6. Generate some traffic for your app, then wait a few minutes for data to appear in New Relic.
  7. Optional: After installation is complete and you are seeing data, go to the App settings page for additional agent configuration, or to change the browser agent type.

## Browser Application - via REST service
- **When you add a browser app via API (v2), you can only instrument basic page load timing. To use instrumentation supporting all SPA features, [set up single page app monitoring via another method.](https://docs.newrelic.com/docs/browser/single-page-app-monitoring/get-started/install-single-page-app-monitoring/)**
- So basically DON'T create a new New Relic Browser Monitoring app via the REST service
- View the documentation [here](https://docs.newrelic.com/docs/apis/rest-api-v2/browser-examples-v2/add-or-list-browser-apps-api-v2/)
- Create an API key by clicking on your avatar in the navbar > `API Keys` > `Create a Key`
- Create a new  `Browser Application`
  ```shell
  $ curl -X POST 'https://api.newrelic.com/v2/browser_applications.json' \
       -H "X-Api-Key:${APIKEY}" -i \
       -H 'Content-Type: application/json' \
       -d \
  '{
    "browser_application": {
      "name": ${STRING}
    }
  }'
  ```
- List all current browser applications
  ```shell
  $ curl -X GET 'https://api.newrelic.com/v2/browser_applications.json' \
       -H "X-Api-Key:${APIKEY}" -i
  ```
- View a specific browser app
  ```shell
  $ curl -X GET 'https://api.newrelic.com/v2/browser_applications.json' \
       -H "X-Api-Key:${APIKEY}" -i \
       -d "filter[name]=${NAME}"
  ```
- The REST service list each application's `id`, `name`, `browser_monitoring_key`, & `loader_script`
- The `loader_script` is the script tag you need to add to your project


# New Relic Dashboards
- New Relic allows you to create dashboards of widgets so you can visualize your data quickly
- To get started log into New Relic, select the account you want, then click on the `Dashboards` link in the navbar
- In order to really use a Dashboard you need to get some data in the system. A quick and easy way is to add a New Relic browser agent to you clientside application. (see above section)
- Get Started:
  1. Select an account from the `Accounts` dropdown
  2. Navigate to the Dashboard section via the NavBar
    ![new relic dashboard nav link](/assets/blog/nr/nav-dashboard-localtion.png)
  3. Create a new dashboard
    - Click the `+ Create a dashboar`  button in the top right of the screen
    - then `Create a new dashboard`
    - Then give you dashboard a name and select your account
  4. Start adding widgets
- Dashboard are designed to be a 12 column width
- New Relic provides a bunch of premade widgets but if you don't find what you need you can always create your own custom one
- I would highly recommend to use the `Data explorer` & `Query builder` to understand the data that you can work with before creating a widget
- Types of widgets:
  - Area chart
  - Bar chart
  - Billboard
  - Bullet chart
  - Funnel
  - Heat map
  - HistogramJSON
  - Line
  - Pie chart
  - Table
- You can also use Terraform to build & maintain you dashboards

## Custom Widgets
- ...


## Custom Application
- ...

## Terraform to build Dashboards
1. Create a New Relic Account Key
2. Write some terraform

- `./infrastructure/main.tf`
  ```hcl
  terraform {
    backend "s3" {
      key    = "my-dashboards"
      region = "us-west-2"
    }

    required_version = ">= 0.13.5"
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~>3.4"
      }
      newrelic = {
        source  = "newrelic/newrelic"
        version = "~> 2.21.0"
      }
    }
  }
  ```
- `./infrastructure/newrelic.tf`
  ```hcl
  provider "newrelic" {
    account_id = var.NR_ACCOUNT_ID
    api_key    = var.NR_API_KEY
    region     = "US" # Valid regions are US and EU
  }

  variable "NR_ACCOUNT_ID" {
    type = string
  }

  variable "NR_API_KEY" {
    type = string
  }
  ```
- `./infrastructure/dashboard.tf`
  ```hcl
  variable dashboard_name {
    default = "My Dashboard"
  }

  variable dashboard_default_page {
    default = "Page One"
  }

  variable nr_browser_app_name {
    default = "awesome-client-app"
  }

  resource "newrelic_one_dashboard" "nark_dashboard" {
    name = var.dashboard_name
    page {
      name = var.dashboard_default_page

      # First Row
      widget_billboard {
        title  = "Users Visits"
        row    = 1
        column = 1
        width  = 2
        height = 3

        nrql_query {
          account_id = var.NR_ACCOUNT_ID # You can use multiple account id
          query      = "SELECT count(*) FROM JavaScriptError FACET errorClass SINCE 1 week ago WHERE appName = '${var.nr_browser_app_name}'"
        }
      }
      widget_table {
        title  = "Users"
        row    = 1
        column = 3
        width  = 10
        height = 3

        nrql_query {
          account_id = var.NR_ACCOUNT_ID # You can use multiple account id
          query      = "SELECT count(*) FROM JavaScriptError FACET errorClass SINCE 1 week ago TIMESERIES WHERE appName = '${var.nr_browser_app_name}'"
        }
      }

      # Second Row
      widget_markdown {
        title  = "Dashboard Note"
        row    = 4
        column = 1
        width  = 12
        height = 4
        text = "#You can write some markdown here!!"
      }

    }
  }
  ```

- Create a `.env`
  ```shell
  NR_API_KEY="NRAK-******************************"
  NR_ACCOUNT_ID=########
  AWS_TERRAFORM_STATE_BUCKET="terraform-remote-config-#########"
  ````

- Now create a deploy script `./deploy.sh`
  ```shell
  # Load .env file if present
  if [ -f .env ]; then export $(cat .env | xargs); fi

  # Terraform stuff
  pushd infrastructure 
  rm -rf .terraform/

  # Init terraform with remote state file
  echo "Using Terraform state bucket: $AWS_TERRAFORM_STATE_BUCKET"
  terraform init -backend-config bucket="${AWS_TERRAFORM_STATE_BUCKET}"

  terraform apply -auto-approve \
    -var="NR_API_KEY=$NR_API_KEY" \
    -var="NR_ACCOUNT_ID=$NR_ACCOUNT_ID"

  popd
  ```
- and a destroy script if you like
  ```shell
  # Load .env file if present
  if [ -f .env ]; then export $(cat .env | xargs); fi

  # Terraform stuff
  pushd infrastructure 
  rm -rf .terraform/

  # Init terraform with remote state file
  echo "Using Terraform state bucket: $AWS_TERRAFORM_STATE_BUCKET"
  terraform init -backend-config bucket="${AWS_TERRAFORM_STATE_BUCKET}"

  terraform destroy -auto-approve \
    -var="NR_API_KEY=$NR_API_KEY" \
    -var="NR_ACCOUNT_ID=$NR_ACCOUNT_ID"

  popd
  ```











# Alert Policies
- In New Relic *Alert Policy* is basically a folder containing multiple *contidions*
- The condition is basically *what* to monitor, *when* a condidtion is met, & *who* to notify
- After creating 1/more conditions if one of those conditions are hit it will generate a violation, which will then create incidents
- Incidents lifecycle: *open*, *acknowledged*, & *close*

- Creating NR Alerts and conditions manually:
  1. Create a `Alert Policy` aka *Alert Folder*:
    - Select the `tech-prd` account
    - `Alerts & AI` > `Alert conditions (Policies)` > `+ New alert policy`
    - Create alert policy
    - Alert policy name
    - Incident preference `By policy`, `By condition`, `By condition and signal`
  2. Add condition(s) 
    - Click the `Create a condition`
    - Select a category: `Browser` > `Metric`
    - Select an entity(s): `nike-cx/**`
    - Select a threshold: 
      - `Apdex score` or `Page views with JS errors`
      - `10`% for at least `5` minutes
- Create *Alert Policy* & *Condition* with terraform:
  ```hcl
  terraform {
    backend "s3" {
      key    = "my-nr-alerts"
      region = "us-west-2"
    }

    required_version = ">= 0.13.5"
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~>4.2.0"
      }
      newrelic = {
        source  = "newrelic/newrelic"
        version = "~> 2.37.0"
      }
    }
  }

  provider "newrelic" {
    account_id = var.NR_ACCOUNT_ID
    api_key    = var.NR_API_KEY_PROD
    region     = "US" # Valid regions are US and EU
  }

  ##################################################
  # Create Alert Policy & Condition
  ##################################################
  resource "newrelic_alert_policy" "alert_policy" {
    name = "My Web App - Browser Policy"
  }

  resource "newrelic_nrql_alert_condition" "spike_of_10x" {
    policy_id = newrelic_alert_policy.alert_policy.id
    enabled   = var.enable_alerts

    ##################################################
    # Section: Enter condition name
    ##################################################
    name = "10x error"

    ##################################################
    # Section: Define your signal
    ##################################################
    nrql {
      query = "SELECT count(*) FROM JavaScriptError FACET errorClass WHERE appName = '${var.nr_browser_monitor_app_name}'"
    }
    fill_value  = 1.0
    fill_option = "static" # Strategy to use when filling gaps in the signal.


    ##################################################
    # Section: `Set your condition thresholds`
    ##################################################
    type = "static" # [static, baseline, outlier]
    value_function = "sum" # [single_value, sum] # `Open violation when the`  sum == `sum of query result is`
    aggregation_delay = 120
    # expiration_duration            = 120    #  `Signal is lost after` 
    # close_violations_on_expiration = true   # `Close all current open violations`
    # open_violation_on_expiration   = true   # `Open new "lost signal" violation`

    critical {
      operator              = "above"
      threshold             = 10
      threshold_duration    = 300 # 5 minutes
      threshold_occurrences = "at_least_once"
    }

    # warning {
    #   operator              = "above"
    #   threshold             = 10
    #   threshold_duration    = 600
    #   threshold_occurrences = "ALL"
    # }

    ##################################################
    # Fine-tune advanced signal settings
    ##################################################
    aggregation_method = "event_flow" # `Streaming method` [cadence, event_flow, event_timer]

    ##################################################
    # Section: Additional settings
    ##################################################
    violation_time_limit_seconds = 259200 # (3 days) `Close open violations after:` automatically force-close a long-lasting violation
    description                  = "Alert when there is a 10x the account of JS errors for our client-side application" # `Send a custom violation description`
    runbook_url                  = var.runbook_url
  }
  
  #########################
  # Send out alerts
  #########################
  # Creates an email alert channel.
  resource "newrelic_alert_channel" "email_channel" {
    name = "CX - ${var.project_name} - Browser Alert"
    type = "email"
    config {
      recipients              = "phil.willis@gmail.com"
      include_json_attachment = "true"
    }
  }

  # Creates a Slack alert channel.
  resource "newrelic_alert_channel" "slack_channel" {
    name = "slack-channel-example"
    type = "slack"
    config {
      channel = "#example-channel"
      url     = "http://example-org.slack.com"
    }
  }

  # Applies the created channels above to the alert policy
  # referenced at the top of the config.
  resource "newrelic_alert_policy_channel" "foo" {
    policy_id  = newrelic_alert_policy.alert_policy.id
    channel_ids = [
      newrelic_alert_channel.email_channel.id,
      newrelic_alert_channel.slack_channel.id
    ]
  }
  ```
  
  ```shell
  # Make sure you have your AWS creds loaded
  
  # New Relic account/api-key
  NR_TECH_PRD_ACCOUNT_ID=#####
  NR_TECH_PRD_API_KEY_PROD="NRAK-##########################" 

  # AWS S3 bucket for TF remote state
  AWS_ACCOUNT_ID="##############"
  terraform_state_bucket="terraform-remote-config-$AWS_ACCOUNT_ID"

  # Terraform stuff
  pushd terraform 
  rm -rf .terraform/

  # Init terraform with remote state file
  terraform init -backend-config bucket="${terraform_state_bucket}"

  terraform apply \
    -var="NR_ACCOUNT_ID=$NR_TECH_PRD_ACCOUNT_ID" \
    -var="NR_API_KEY_PROD=$NR_TECH_PRD_API_KEY_PROD"

  popd
  ```




