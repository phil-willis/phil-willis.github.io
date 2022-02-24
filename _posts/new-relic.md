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




