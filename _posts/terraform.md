---
title: 'terraform'
excerpt: ''
coverImage: '/assets/covers/terraform.jpg'
ogImage:
  url: '/assets/covers/terraform.jpg'
---



<details>
<summary>What is Terraform</summary>

- Terraform is `Infrasture as code`
- Other "infrasture-as-code" are: chef, puppet, anisble, SaltStack, CloudFoundation
- The major building pieces to TF are:
  - variable (variables)
  - locals (variables with interpellation)
  - provider (aws|azure|google)
  - provisioners (execute scripts on a local or remote machine as part of the creation or destruction)
  - data (get information on existing services)
  - resource (create resource)
  - module (isolate configuration)
- Links:
  - [intro](https://blog.gruntwork.io/an-introduction-to-terraform-f17df9c6d180)
  - [medium post](https://medium.com/@pavloosadchyi/terraform-patterns-and-tricks-i-use-every-day-117861531173)

- Terraform is `declarative`, it says "I declare therefore i am"
- non-Terraform services do not get auto-magicly added to your state, Terraform only tracks the things it makes
  1. configurations: i declare the intent
  2. State: current state
- dry run `$ terraform plan`
- **NOTE** Terraform ignores subfolders, in order to use subfolders you have to configure the subfolders to be a `terraform module`, then include those modules in your `main.tf` file

</details>




<details>
<summary>Install</summary>

- You can install TF with homebrew but it's better to install it with `tfswitch` with homebrew
- [Terraform version manager](https://warrensbox.github.io/terraform-switcher/)
- this will allow you to switch version very easily
  ```
  $ brew install warrensbox/tap/tfswitch
  $ tfswitch 0.12.4
  $ terraform -v
  ```
</details>





<details>
<summary>Save remote-state in S3</summary>

- [docs](https://www.terraform.io/docs/backends/types/s3.html)
- It is highly recommended that you enable Bucket Versioning on the S3 bucket to allow for state recovery in the case of accidental deletions and human error.
- Paths to the state file inside the bucket: _`<bucket>/<workspace_key_prefix>/<workspace_name>/<key>`_
  ```html
  "Amazon S3"/<BUCKET_NAME_FOR_TF_STATE>/env:/dev/<TF_STATE_KEY>
  "Amazon S3"/<BUCKET_NAME_FOR_TF_STATE>/env:/staging/<TF_STATE_KEY>
  "Amazon S3"/<BUCKET_NAME_FOR_TF_STATE>/env:/prod/<TF_STATE_KEY>
  ```
- Here is the format for the terraform remote state code block
  ```hcl
  terraform {
    backend "s3" {
      bucket = "mybucket"
      key    = "path/to/my/key"     # <TF_STATE_KEY>, it can just be a single string
      region = "us-east-1"
    }
  }
- Here is an example for the terraform remote state code block
  ```hcl
  terraform {
    backend "s3" {
      key    = "someawesomesite"
      region = "us-west-2"
    }
    required_version = ">= 0.13.5"
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~>3.4"
      }
    }
  }
  ```
  
- Key: the path to the state file inside the bucket. When using a non-default workspace, the state path will be /workspace_key_prefix/workspace_name/key
  ```hcl
  data "terraform_remote_state" "network" {
    backend = "s3"
    config = {
      bucket = "terraform-state-prod"
      key    = "network/terraform.tfstate"
      region = "us-east-1"
    }
  }
  ```
- Or you can have a blank terraform.backend and configure it with bash command
  ```shell
  state_key="prod/some-app/${ENVIRONMENT}.tfstate"
  terraform init \
    -backend-config bucket="my-terraform-state-bucket" \
    -backend-config="key=${state_key}" \
    -backend-config="encrypt=true" \
    -backend-config="region=us-west-2"
  ```
  ```hcl
  terraform {
    backend "s3" {}
  }
  ```
</details>




<details>
<summary>Terraform CLI</summary>

- [Terraform CLI](https://www.terraform.io/docs/commands/index.html)
- `$ terraform workspace (list|select|new|delete|show)`
  ```shell
  $ terraform init
  $ terraform validate
  $ terraform fmt   # format all terraform at the current folder level 
  $ terraform plan
  $ terraform apply
  $ terraform apply -auto-approve
  $ terraform output
  $ terraform workspace

  $ terraform import aws_s3_bucket.bucket <bucket-name>
  ```

- The terraform output command is used to extract the value of an output variable from the state file.
  ```shell
  $ terraform plan
  $ terraform output

  $ cd to-base-of-tf-directory
  $ terraform output

  $ terraform workspace select prod && terraform refresh
  ```
</details>















<details>
<summary>Terraform Plugins</summary>

- Terraform relies on plugins called "providers" to interact with remote systems
- Defining your providers:
  ```hcl
  terraform {
    required_providers {
      mycloud = {
        source  = "mycorp/mycloud"
        version = "~> 1.0"
      }
    }
  }
  ```
- The `required_providers` block must be nested inside the top-level `terraform` block (which can also contain other settings).
- [main providers](https://registry.terraform.io/namespaces/hashicorp)
  - Lifecycle management of AWS resources, including EC2, Lambda, EKS, ECS, VPC, S3, RDS, DynamoDB, and more. This provider is maintained internally by the HashiCorp AWS Provider team.
</details>








<details>
<summary>Variable</summary>

- You can define variables and provide `type`, `default` value, `description`
- Varaibles have to be hard-coded (you cannot interpolating values)
  ```hcl
  variable "some_variable" {
    type = string
    default = "hello"
    description = "This is an example of a variable that has a string type"
  }
  ```
- Basic variable types are: string/list/map:
- The basic structure of defining a variable is:
  ```hcl
  variable "some_key" {
    type    = "<string|list|map>"
    default = "<SOME_DEFAULT_VALUE>"
  }
  ```
- All variables used have to be defined beforehand
- Example of the 3 basic types:
  - String
    ```hcl
    variable some_string {
      type = "string"
      default = "hello terraform string"
      description = "this is a simple string"
    }

    # Use into the resource
    some-parameter = "${var.some_string}
    ```
  - List
    ```hcl
    variable some_list {
      type = "list"
      default = [
        "subnet1",
        "subnet2",
        "subnet3",
      ]
      description = "this is a list"
    }
    # Use into the resource
    some-parameter = "${var.some_list[0]}
    ```
  - Map
    ```hcl
    variable some_map {
      type = "map"
      default = {
        subnet1 = "subnet1",
        subnet2 = "subnet2",
        subnet3 = "subnet3",
      }
      description = "this is a map"
    }

    # Use into the resource
    some-parameter = "${var.some_map["subnet1"]}
    ```
- `null` value is a special value that has no type
  - a value that represents absence or omission
  - If you set an argument of a resource or module to null, Terraform behaves as though you had completely omitted it
- When you run terraform all the empty variables (ones without a default value) if not provided in the command will be asked before terraform does it magic.
- You can also override any variables by passing in them as a flag when you run a terraform command
  ```shell
  $ terraform apply -var some_key="this rocks"
  ```
- Providing a `Variables File`
  - All `*.tfvars` will get picked up when you run terraform, sometimes you want to load specific variable files based on the environment you want to deploy so passing supply `-var-file=<FILE_NAME>.tfvars` with variable values might a great way to deal with different variables for different environments
  - `tfvar` file
    ```hcl
    domain_suffix = "-dev"
    hosted_zone_name = "someawesomesite.com"
    env_tag          = "Development"
    ```
  - `main.tf` file
    ```hcl
    variable domain_suffix {}
    variable hosted_zone_name {}
    variable env_tag {}
    ```
  - `Plan` script
    ```shell
    # `plan.sh` script to run a plan
    WORKSPACE="dev"
    VAR_FILE="./env_configs/dev.tfvars"
    terraform_state_bucket="<TERRAFORM_S3_STATE_BUCKET>"
    rm -rf .terraform/
    terraform init -backend-config bucket="${terraform_state_bucket}"
    if ! terraform workspace select ${WORKSPACE}; then
      terraform workspace new ${WORKSPACE}
    fi
    terraform plan -var-file=$VAR_FILE
    ```
- You can provide variables via the terminal 

  ```shell
  terraform apply -auto-approve \
    -var="SOME_VAR_NAME=SOME_VALUE" \
    -var="SOME_OTHER_VAR_NAME=SOME_VALUE"
  ```

  ```hcl
  variable "SOME_VAR_NAME" {
    type = string
  }

  variable "SOME_OTHER_VAR_NAME" {
    type = string
  }
  ```
</details>



<details>
<summary>Locals (Local Value Configuration)</summary>

- locals are like variables that you can pass in ${dynamic} values
- A local value assigns a name to an expression, so you can use it multiple times within a module without repeating it.
- DRY principles, allows you to preform logic to create a value where you don't have to write every time
- You can also reference the a local variable inside the locals code block
- eg of locals
  ```hcl
  locals {
    bucket_name = "${replace(var.app_namespace, "_", "-")}-${terraform.workspace}-client"
    domain_name = "${var.domain_name}${var.domain_suffix}.${var.hosted_zone_name}"
  }
  ```

  ```hcl
  # Ids for multiple sets of EC2 instances, merged together
  locals {
    instance_ids = "${concat(aws_instance.blue.*.id, aws_instance.green.*.id)}"
  }

  # A computed default name prefix
  locals {
    default_name_prefix = "${var.project_name}-web"
    name_prefix         = "${var.name_prefix != "" ? var.name_prefix : local.default_name_prefix}"
  }

  # Local values can be interpolated elsewhere using the "local." prefix.
  resource "aws_s3_bucket" "files" {
    bucket = "${local.name_prefix}-files"
    # ...
  }
  ```
</details>






<details>
<summary>Provider</summary>


- [providers](https://www.terraform.io/docs/providers/index.html)
- Providers are basically cloud providers as a service
  - IaaS (infrastruture as a Service) like AWS, Azure, GCP
  - PaaS (Platform as a Service) like Heroku
  - SaaS (Software as a Service) like DNSimple, CloudFlare
- [AWS](https://www.terraform.io/docs/providers/aws/index.html)
  - you can pass in your access-key/secret-key via environment variables, or hardcoded (not recommended)
- [tut](https://alimac.io/static-websites-with-s3-and-hugo-part-1/)

- Different ways to define providers:
  1. aws creds
    ```hcl
    provider "aws" {
      # access_key = "${var.aws_access_key}"
      # secret_key = "${var.aws_secret_key}"
      region     = "us-east-2"
    }
    ```

  2. hard-coded:
    ```hcl
    provider "aws" {
      region     = "us-west-2"
      access_key = "my-access-key"
      secret_key = "my-secret-key"
    }
    ```

  3. via Environment variables
    ```hcl
    provider "aws" {}
    ```
    ```shell
    $ export AWS_ACCESS_KEY_ID="anaccesskey"
    $ export AWS_SECRET_ACCESS_KEY="asecretkey"
    $ export AWS_DEFAULT_REGION="us-west-2"
    $ terraform plan
    ```

  4. shared credentials:
    ```hcl
    provider "aws" {
      region                  = "us-west-2"
      shared_credentials_file = "/Users/tf_user/.aws/creds"
      profile                 = "customprofile"
    }
    ```
  - [using multiple providers](https://www.terraform.io/docs/configuration/providers.html#alias-multiple-provider-instances)
</details>











<details>
<summary>Data</summary>

- Get information on an existing resource
- aws_route53_zone
- aws_caller_identity
- aws_acm_certificate
</details>












<details>
<summary>Resource</summary>

- Create AWS resources:
  - aws_iam_policy_document
  - aws_acm_certificate
  - aws_acm_certificate_validation
  - aws_route53_record
  - aws_s3_bucket
  - aws_cloudfront_distribution
  - aws_cloudfront_origin_access_identity
- *** you can make a resource optionally if you pass in a count***
  - if you want the resource to be created if var.env == prod
    ```hcl
    count = "${var.env == "prod" ? 1 : 0}"
    ```
</details>












<details>
<summary>Provisioners</summary>


- used to execute scripts on a local or remote machine as part of the creation or destruction
- creation-time provisioners
  ```hcl
  resource "aws_instance" "web" {
    # ...
    provisioner "local-exec" {
      command = "echo ${self.private_ip} > file.txt"
    }
  }
  ```
- by default provisioners run when a resource is created, not during the updating or any other lifecycle
- it is meant for bootstrapping a system
- if a creation-time provisioner fails, the resource will be flagged as _tainted_, and will be planned for destruction upon the next _$ terraform apply_
- destroy-time provisioner
  ```hcl
  resource "aws_instance" "web" {
    # ...
    provisioner "local-exec" {
      when    = "destroy"
      command = "echo 'Destroy-time provisioner'"
    }
  }
  ```
- multiple provisioners
  - you can add multiple provisioners and they will run in the order they are defined
  ```hcl
  resource "aws_instance" "web" {
    # ...
    provisioner "local-exec" {
      command = "echo first"
    }
    provisioner "local-exec" {
      command = "echo second"
    }
  }
  ```
</details>








<details>
<summary>Outputs</summary>


- You can print out the values that terraform will generate, when you run it with with `$ terraform output` it will output all the variable that is provided from the tfstate file
- When you make a module you can define the `output` your module provides as getters
- You can create bash variables from terraform `output`

  ```hcl
  output "bucket_name" {
    value = "${local.s3_bucket_website_name}"
  }
  ```

  ```shell
  terraform apply -auto-approve
  bucket_name=$(terraform output bucket_name)
  npm run build
  aws s3 rm s3://$bucket_name/  --recursive
  aws s3 sync build/ s3://$bucket_name/ --exclude \"*.DS_Store*\"
  aws s3 cp build/index.html s3://$bucket_name/ --cache-control max-age=0
  ```
</details>











<details>
<summary>Workspace</summary>

- [docs](https://www.terraform.io/docs/state/workspaces.html)
- if you don't define a workspace then you only worked on the "default" workspace
- defines how operations are executed
- where persistent data are stored (for example terraform-state file)
- Creating a new workspace:
  ```shell
  $ terraform_state_bucket="ngp-terraform-remote-config"
  $ terraform init -backend-config bucket="${terraform_state_bucket}"

  $ ENVIRONMENT=dev
  $ terraform workspace new $ENVIRONMENT
  ```
- Using an existing workspace:
  ```shell
  $ terraform_state_bucket="ngp-terraform-remote-config"
  $ terraform init -backend-config bucket="${terraform_state_bucket}"

  $ ENVIRONMENT=dev
  $ terraform workspace select $ENVIRONMENT
  ```
</details>








<details>
<summary>Auto approve</summary>

# Terraform auto-approve apply
```shell
$ terraform apply -auto-approve
```
</details>






<details>
<summary>Modules</summary>


- Terraform ignores subfolders, in order to use subfolders you have to configure the subfolders to be a `terraform module`, then include those modules in your `main.tf` file.
  ```hcl
  module "custom_module" {
    source = "./modules/custom_module"

    app_name = "app-name"
  }
  ```
- Modules can be created locally or accessed at a url
- It's like a class for terraform, it encapsulate a piece of configuration
- A container for multiple resources that are used together.
- Modules structure:
  1. **Input variables**
    - accept values from the calling modules
  2. **Output values**
    - returns values you can ues to populate arguments elsewhere
  3. **Resources**
    - define 1-or-more infrastructure objects that the module will manage.
- To define a module, create a new directory and place some `.tf` files inside of it
- Terraform can load modules either from local relative paths (prefix with `./`) or from remote repositories
  - `"./"` prefix indicates that the address is a relative filesystem path.
- minimal folder structure:
  ```shell
  .
  ├── README.md
  ├── main.tf
  ├── variables.tf
  ├── outputs.tf
  ```
- Standard structure with nested module
  ```shell
  .
  ├── README.md
  ├── main.tf
  ├── variables.tf
  ├── outputs.tf
  ├── ...
  ├── modules/
  │   ├── nestedA/
  │   │   ├── README.md
  │   │   ├── variables.tf
  │   │   ├── main.tf
  │   │   ├── outputs.tf
  │   ├── nestedB/
  ```
- Accessing the module's outputs you need to reference the module's outputs inside the root tf files. Example `./main.tf`
  ```hcl
  output "root_variable_output_val" {
    value = "Hello from the root tf"
  }

  output "module_variable_output_val" {
    value = module.some_awesome_module
  }
  ```
- Calling modules `module.<MODULE_NAME>.<OUPUT_VALUE>`
- [source modules](https://www.terraform.io/docs/modules/sources.html) 
  - module installer supports:
    - Local paths
    - Terraform Registry
    - GitHub
    - BitbucketGeneric Git, Mercurial repositories
    - HTTP URLs
    - S3 buckets
    - GCS buckets
  - Example of using modules source
    ```hcl
    module "consul" {
      source = "./consul"
    }
    ```
  - Example of using modules source
    ```hcl
    module "consul" {
      source = "../module_at_parent_level"
    }
    ```
  - Example of using modules source from Github
    ```hcl
    module "consul" {
      source = "git::https://github.com/<GITHUB_NAMESPACE>/<REPO_NAME>.git"
    }
    ```
    ```hcl
    module "consul" {
      source = "git::https://github.com/<GITHUB_NAMESPACE>/<REPO_NAME>.git?ref=1.2.3"
    }
    ```
    ```hcl
    module "consul" {
      source = "git::https://github.com/<GITHUB_NAMESPACE>/<REPO_NAME>.git?ref=<SOME_BRANCH_NAME>"
    }
    ```

- [terraform-aws-acm-certificate](https://github.com/azavea/terraform-aws-acm-certificate)
  ```hcl
  provider "aws" {
    region = "us-east-1"
    alias  = "certificates"
  }

  provider "aws" {
    region = "us-west-2"
    alias  = "dns"
  }

  resource "aws_route53_zone" "default" {
    name = "azavea.com"
  }

  module "cert" {
    source = "github.com/azavea/terraform-aws-acm-certificate?ref=1.1.0"

    providers = {
      aws.acm_account     = "aws.certificates"
      aws.route53_account = "aws.dns"
    }

    domain_name                       = "azavea.com"
    subject_alternative_names         = ["*.azavea.com"]
    hosted_zone_id                    = "${aws_route53_zone.default.zone_id}"
    validation_record_ttl             = "60"
    allow_validation_record_overwrite = true
  }
  ```
- **NOTE:** *If you want to conditionally use a module*, Terraform 0.13 allows you do add a count to a module. You might want to use this if you only want a module to run in a specific deployment environment
  ```hcl
  variable forProd {
    default = false
  }
  resource "resource_type" "resource_name" {
   count = var.forProd ? 1 : 0
   ... other resource properties 
  }
  ```
</details>











# Terraform and Providers

<details>
<summary>New Relic - Dashboard</summary>

- Assign some variables to the new-relic account id & api-key
  ```hcl
  variable account_id {}
  variable api_key {}
  ```
- terraform block & newrelic provider
  ```hcl
  terraform {
    required_version = ">= 0.13.5"
    required_providers {
      newrelic = {
        source  = "newrelic/newrelic"
        version = "~> 2.21.0"
      }
    }
  }

  provider "newrelic" {
    account_id = var.account_id
    api_key    = var.api_key
    region     = "US" # Valid regions are US and EU
  }
  ```

- Create a new relic one dashboard
  ```hcl
  resource "newrelic_one_dashboard" "nark_dashboard" {
    name = var.dashboard_name

    page {
      name = var.dashboard_name

      widget_markdown {
        title  = "Dashboard Note"
        row    = 1
        column = 1
        text = "# A"
      }
      widget_markdown {
        title  = "Dashboard Note"
        row    = 1
        column = 5
        text = "# B"
      }
      widget_markdown {
        title  = "Dashboard Note"
        row    = 1
        column = 9
        text = "# C"
      }

      widget_markdown {
        title  = "Dashboard Note"
        row    = 5
        column = 1
        text = "# D"
      }
      widget_markdown {
        title  = "Dashboard Note"
        row    = 5
        column = 5
        text = "# E"
      }
      widget_markdown {
        title  = "Dashboard Note"
        row    = 5
        column = 6
        text = "# F"
      }

    }
  }
  ```
- Pass in the newrelic account/api-key which running the terraform script
  ```shell
  $ NR_ACCOUNT_NUMBER="****"
  $ NR_API_KEY="****"

  $ terraform plan \
    -var="account_id=$NR_ACCOUNT_NUMBER" \
    -var="api_key=$NR_API_KEY"

  $ terraform apply -auto-approve \
    -var="account_id=$NR_ACCOUNT_NUMBER" \
    -var="api_key=$NR_API_KEY"
  ```
</details>






<details>
<summary>AWS - API Gateway</summary>

1. Create a lambda function, `src/index.js`
  ```js
  module.exports.handler = async (event) => {
    console.log('Event: ', event);
    let responseMessage = 'Hello, World!';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: responseMessage,
      }),
    }
  }
  ```
2. Create a `.gitignore`

  ```shell
  # Local .terraform directories
  **/.terraform/*

  # .tfstate files
  *.tfstate
  *.tfstate.*

  # Crash log files
  crash.log

  # Exclude all .tfvars files, which are likely to contain sentitive data, such as
  # password, private keys, and other secrets. These should not be part of version 
  # control as they are data points which are potentially sensitive and subject 
  # to change depending on the environment.
  #
  *.tfvars

  # Ignore override files as they are usually used to override resources locally and so
  # are not checked in
  override.tf
  override.tf.json
  *_override.tf
  *_override.tf.json

  # Include override files you do wish to add to version control using negated pattern
  #
  # !example_override.tf

  # Include tfplan files to ignore the plan output of command: terraform plan -out=tfplan
  # example: *tfplan*

  # Ignore CLI configuration files
  .terraformrc
  terraform.rc
  hello-world.zip
  response.json

  # node packages
  node_modules
  ```
3. Script for running the lambda file locally
- Create an `test/event.json` file to pass into your lambda
  ```json
  {
    "resource": "/API/PATH",
    "path": "/API/PATH",
    "httpMethod": "POST",
    "headers": {},
    "multiValueHeaders": {},
    "queryStringParameters": null,
    "multiValueQueryStringParameters": null,
    "pathParameters": null,
    "stageVariables": null,
    "requestContext": {
      "resourceId": "xxxxx",
      "resourcePath": "/api/endpoint",
      "httpMethod": "POST",
      "path": "/env/api/endpoint",
      "protocol": "HTTP/1.1",
      "stage": "env",
      "domainName": "url.us-east-1.amazonaws.com"
    },
    "body": "{\n    \"city\": \"Test 1 City\",\n    \"state\": \"NY\",\n    \"zipCode\": \"11549\"\n}",
    "isBase64Encoded": false
  }
  ```
- Add a script to run the lambda file locally
  ```json
  {
    "scripts": {
      "lambda:envoke:local": "node -e \"console.log(require('./src/index.js').handler(require('./test/event.json')));\""
    }
  }
  ```
4. Let's add some terraform files
- Create  `./terraform/main.tf` and let's add the AWS providers, define the remote config file key
  ```hcl
  terraform {
    backend "s3" {
      key    = "api-gateway-example"
      region = "us-west-2"
    }
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~> 4.0.0"
      }
      archive = {
        source  = "hashicorp/archive"
        version = "~> 2.2.0"
      }
    }
    required_version = "~> 1.0"
  }

  provider "aws" {
    region = var.aws_region
  }
  ```
- Create `./terraform/variables.tf`
  ```hcl
  variable "aws_region" {
    description = "AWS region for all resources."

    type    = string
    default = "us-west-2"
  }

  variable "project_name" {
    type = string
    description = "Project name to be used throughout the application"
    default = "example-tf-api-gateway"
  }
  ```
5. Manually create an S3 bucket for your terraform state files and call it `terraform-remote-config-<AWS_ACCOUNT_NUMBER>`
6. Let's run this 
- **NOTE** you want to make you have your AWS-CLI credential configured ([more here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html)) so that Terraform can push to the right account.
- Create a `./deploy.sh` file
  ```shell
  set -e

  # Environments
  case "$1" in
    dev) 
      WORKSPACE="dev"
      ;;
    prod) 
      WORKSPACE="prod"
      ;;
    *)
      echo $"Usage: $0 {dev|prod}"
      exit 1
  esac
  echo "Running tf-deploy on ${WORKSPACE}"

  # Terraform state, bucket name
  AWS_ACCOUNT_ID=$(aws sts get-caller-identity | jq -r '.Account')
  terraform_state_bucket="terraform-remote-config-$AWS_ACCOUNT_ID"
  echo "Using Terraform state bucket: $terraform_state_bucket"

  pushd terraform

  # Cleanup .terraform
  rm -rf .terraform/

  # Deploy terraform
  terraform init -backend-config bucket="${terraform_state_bucket}"

  # If the workspace does not exist, create it.
  if ! terraform workspace select ${WORKSPACE}; then
    terraform workspace new ${WORKSPACE}
  fi
  terraform apply -auto-approve
  popd

  echo "DONE!"
  ```
- Run the script
  ```shell
  # Allow the deploy script to be run 
  $ chmod +x deploy.sh

  $ ./deploy.sh
  ```
- Now if you go to AWS console and look in your `terraform-remote-config-<AWS_ACCOUNT_NUMBER>` bucket yo should have `./env:/dev/api-gateway-example` file
- Sweet now we have terraform setup that will update the state file in AWS so others can work on this project instead of the state file only being on your machine,

7. Create and upload Lambda function archive to S3
  ```hcl
  resource "aws_s3_bucket" "rest_api_source" {
    bucket = var.project_name

    tags = {
      Name        = "My bucket for API Gateway source code"
      Environment = "Dev"
    }
  }

  resource "aws_s3_bucket_acl" "example" {
    bucket = aws_s3_bucket.rest_api_source.id
    acl    = "private"
  }

  data "archive_file" "rest_api_source" {
    type = "zip"

    source_dir  = "../rest-api/${path.module}/src"
    output_path = "../rest-api/${path.module}/dist/rest-api-source.zip"
  }

  resource "aws_s3_object" "rest_api_source" {
    bucket = aws_s3_bucket.rest_api_source.id

    key    = "rest-api-source.zip"
    source = data.archive_file.rest_api_source.output_path

    etag = filemd5(data.archive_file.rest_api_source.output_path)
  }
  ```
8. Create the lambda function from the S3 zipped file
  ```hcl
  resource "aws_lambda_function" "rest_api" {
    function_name = var.project_name

    s3_bucket = aws_s3_bucket.rest_api_source.id
    s3_key    = aws_s3_object.rest_api_source.key

    runtime = "nodejs12.x"
    handler = "index.handler"

    source_code_hash = data.archive_file.rest_api_source.output_base64sha256

    role = aws_iam_role.lambda_exec.arn
  }

  resource "aws_cloudwatch_log_group" "rest_api" {
    name = "/aws/lambda/${aws_lambda_function.rest_api.function_name}"

    retention_in_days = 30
  }

  resource "aws_iam_role" "lambda_exec" {
    name = "serverless_lambda"

    assume_role_policy = jsonencode({
      Version = "2012-10-17"
      Statement = [{
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = "lambda.amazonaws.com"
        }
        }
      ]
    })
  }

  resource "aws_iam_role_policy_attachment" "lambda_policy" {
    role       = aws_iam_role.lambda_exec.name
    policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  }
  ```

- Custom Authorizer needs to return IAM Policy, [learn more here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-lambda-authorizer-output.html), for example:
  ```json
  {
    "principalId": "yyyyyyyy", // The principal user identification associated with the token sent by the client.
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow|Deny",
          "Resource": "arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}/[{child-resources}]]"
        }
      ]
    },
    "context": {
      "stringKey": "value",
      "numberKey": "1",
      "booleanKey": "true"
    },
    "usageIdentifierKey": "{api-key}"
  }
  ```
- The `context` object is optional
- [Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html)

</details>






<details>
<summary>AWS - Elastic Container Registry (ECR) </summary>

# ECR
- ECR is your own Docker repository where you can push images up to your AWS account
- Lets create a simple registry and add a docker container
  1. Create a Node.js application e.g. `$ yarn create nest`
  2. Create a docker file, `./Dockerfile`
    ```shell
    FROM node:18-alpine
    WORKDIR /user/src/app
    COPY . .
    RUN rm -rf node_modules && yarn install --frozen-lockfile
    RUN yarn build
    USER node
    CMD ["npm", "run", "start:prod"]
    ```
  2. Create the AWS ECR
    - [AWS Docs](https://docs.aws.amazon.com/AmazonECR/latest/userguide/getting-started-cli.html)
      ```shell
      REPO_NAME="meee/nestjs-api"
      AWS_REGION="us-west-2"
      aws ecr create-repository \
          --repository-name $REPO_NAME \
          --image-scanning-configuration scanOnPush=true \
          --region $AWS_REGION
      ```
    - Or with Terraform 
      ```hcl
      provider "aws" {
        region  = "us-west-2"
      }

      terraform {
        required_providers {
          aws = {
            source  = "hashicorp/aws"
            version = "~> 4.16"
          }
        }
        required_version = ">= 1.0.10"
      }

      variable "ecr_registry_name" {
        type = string
      }

      resource "aws_ecr_repository" "ecr_repo" {
          name = var.ecr_registry_name
      }
      ```
  3. Create a build/deploy script
    ```shell
    # Variables
    IMAGE_TAG=$(node -p -e "require('./package.json').version")
    AWS_REGION="us-west-2"
    IMAGE_NAME="nike/nestjs-api"
    ACCOUNT_ID=$(aws sts get-caller-identity | jq -r ".Account")
    REPOSITORY_URI="$ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com"
    ECR_NAME="ecr_example_repo"

    # Check to see if version already exist
    NODE_V=$(jq ".version" package.json)
    for element in $(aws ecr list-images --repository-name $IMAGE_NAME | jq .imageIds[].imageTag); do
      if [ "$element" == "$NODE_V" ]; then 
        echo "[Error] Version `${element}` Already exist in the remote registry, update your package.json version"
        exit 1
      fi
    done

    # Build your image
    yarn build
    docker build -t "$IMAGE_NAME:$IMAGE_TAG" .
    docker build -t "$REPOSITORY_URI/$IMAGE_NAME:latest" .
    docker build -t "$REPOSITORY_URI/$IMAGE_NAME:$IMAGE_TAG" .

    # Create Infrastructure
    pushd pipelines/terraform
    terraform init
    terraform apply -auto-approve -var ecr_registry_name="$IMAGE_NAME"
    popd

    # Authenticating to Docker
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com"

    # Push to the repository
    docker push "$ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/$IMAGE_NAME:$IMAGE_TAG"
    docker push "$ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/$IMAGE_NAME:latest"
    ```
</details>


<details>
<summary>Elastic Container Service (ECS)</summary>

# ECS
- ECS is a fully managed container orchestration service. AWS ECS is a fantastic service for running your containers. 
- ECS Fargate, as this is a serverless compute service that allows you to run containers without provisioning servers.


1. Create a cluster go [here](https://us-west-2.console.aws.amazon.com/ecs/v2/clusters?region=us-west-2) to see all your clusters
  - Add this to your TF files and run 
    ```hcl
    resource "aws_ecs_cluster" "my_cluster" {
      name = var.cluster_name
    }
    ```
  - You should then see your new cluster in AWS
2. Create a Task
  - Notice how we specify the image by referencing the repository URL of our other terraform resource. 
  - Also notice how we provide the port mapping of 3000. 
  - We also create an IAM role so that tasks have the correct permissions to execute. 
  - If you click Task Definitions in AWS ECS, you should see your new task:
  - Add the following code:
    ```hcl
    # Cluster
    resource "aws_ecs_cluster" "my_cluster" {
      name = var.cluster_name
    }


    variable "task_name" {
      type = string
      description = "(optional) describe your variable"
      default = "my-first-task"
    }


    # Task definition
    resource "aws_ecs_task_definition" "my_first_task" {
      family                   = var.task_name
      container_definitions    = <<DEFINITION
      [
        {
          "name": "${var.task_name}",
          "image": "${aws_ecr_repository.ecr_repo.repository_url}",
          "essential": true,
          "portMappings": [
            {
              "containerPort": 3000,
              "hostPort": 3000
            }
          ],
          "memory": 512,
          "cpu": 256
        }
      ]
      DEFINITION
      requires_compatibilities = ["FARGATE"] # Stating that we are using ECS Fargate
      network_mode             = "awsvpc"    # Using awsvpc as our network mode as this is required for Fargate
      memory                   = 512         # Specifying the memory our container requires
      cpu                      = 256         # Specifying the CPU our container requires
      execution_role_arn       = "${aws_iam_role.ecsTaskExecutionRole.arn}"
    }

    resource "aws_iam_role" "ecsTaskExecutionRole" {
      name               = "ecsTaskExecutionRole"
      assume_role_policy = "${data.aws_iam_policy_document.assume_role_policy.json}"
    }

    data "aws_iam_policy_document" "assume_role_policy" {
      statement {
        actions = ["sts:AssumeRole"]

        principals {
          type        = "Service"
          identifiers = ["ecs-tasks.amazonaws.com"]
        }
      }
    }

    resource "aws_iam_role_policy_attachment" "ecsTaskExecutionRole_policy" {
      role       = "${aws_iam_role.ecsTaskExecutionRole.name}"
      policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
    }
    ```
3. Create VPC
  - As we are using Fargate, our tasks need to specify that the network mode is awsvpc. 
  - As a result, we need to extend our service to include a network configuration.
  - You may have not known it yet, but our cluster was automatically deployed into your account’s default VPC. 
  - However, for a service, this needs to be explicitly stated, even if we wish to continue using the default VPC and subnets. 
  - First, we need to create reference resources to the default VPC and subnets so that they can be referenced by our other resources:
    ```hcl
    resource "aws_default_vpc" "default" {
      tags = {
        Name = "Default VPC"
      }
    }

    # Providing a reference to our default VPC
    resource "aws_default_vpc" "default_vpc" {
    }

    # Providing a reference to our default subnets
    resource "aws_default_subnet" "default_subnet_a" {
      availability_zone = "eu-west-2a"
    }

    resource "aws_default_subnet" "default_subnet_b" {
      availability_zone = "eu-west-2b"
    }

    resource "aws_default_subnet" "default_subnet_c" {
      availability_zone = "eu-west-2c"
    }
    ```
3. Create a service
  - time to create the service, notice that we are using the VPC define above
    ```hcl
    # Service
    resource "aws_ecs_service" "my_service" {
      name            = var.app_name                     # Naming our first service
      cluster         = aws_ecs_cluster.cluster.id       # Referencing our created Cluster
      task_definition = aws_ecs_task_definition.task.arn # Referencing the task our service will spin up
      launch_type     = "FARGATE"
      desired_count   = 2 # Setting the number of containers we want deployed to 2


      network_configuration {
        subnets          = ["${aws_default_subnet.default_subnet_a.id}", "${aws_default_subnet.default_subnet_b.id}", "${aws_default_subnet.default_subnet_c.id}"]
        assign_public_ip = true # Providing our containers with public IPs
      }
    }
    ```
  - 
4. Final step is to create a Load Balancer
  - Add this code to your TF files
    ```hcl
    resource "aws_alb" "application_load_balancer" {
      name               = var.app_name # Naming our load balancer
      load_balancer_type = "application"
      subnets = [ # Referencing the default subnets
        "${aws_default_subnet.default_subnet_a.id}",
        "${aws_default_subnet.default_subnet_b.id}",
        "${aws_default_subnet.default_subnet_c.id}"
      ]
      # Referencing the security group
      security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
    }

    # Creating a security group for the load balancer:
    resource "aws_security_group" "load_balancer_security_group" {
      ingress {
        from_port   = 80 # Allowing traffic in from port 80
        to_port     = 80
        protocol    = "tcp"
        cidr_blocks = ["0.0.0.0/0"] # Allowing traffic in from all sources
      }

      egress {
        from_port   = 0 # Allowing any incoming port
        to_port     = 0 # Allowing any outgoing port
        protocol    = "-1" # Allowing any outgoing protocol 
        cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
      }
    }
    ```
  - To direct traffic we need to create a target group and listener. Each target group is used to route requests to one or more registered targets (in our case, containers). 
  - Add this code to your TF files
    ```hcl
    # Target Group and listener
    resource "aws_lb_target_group" "target_group" {
      name        = "target-group"
      port        = 80
      protocol    = "HTTP"
      target_type = "ip"
      vpc_id      = "${aws_default_vpc.default_vpc.id}" # Referencing the default VPC
      health_check {
        matcher = "200,301,302"
        path = "/"
      }
    }

    resource "aws_lb_listener" "listener" {
      load_balancer_arn = "${aws_alb.application_load_balancer.arn}" # Referencing our load balancer
      port              = "80"
      protocol          = "HTTP"
      default_action {
        type             = "forward"
        target_group_arn = "${aws_lb_target_group.target_group.arn}" # Referencing our tagrte group
      }
    }
    ```
  - Now if you go to EC2 then click on `Load Balancer` 
  - If you view the Listeners tab of your load balancer, you should see a listener that forwards traffic to your target group:
  - We now have to tell your `aws_ecs_service` about this load balancer
    ```hcl
    resource "aws_ecs_service" "my_service" {
      name            = var.app_name                     # Naming our first service
      # ...
      
      load_balancer {
        target_group_arn = "${aws_lb_target_group.target_group.arn}" # Referencing our target group
        container_name   = "${aws_ecs_task_definition.my_first_task.family}"
        container_port   = 3000 # Specifying the container port
      }
    }
    ```
  - ECS service does not allow traffic in by default. We can change this by creating a security group for the ECS service that allows traffic only from the application load balancer security group:

```hcl
# Service
resource "aws_ecs_service" "service" {
  name            = var.app_name                     # Naming our first service
  # ...
  network_configuration {
    # ...
    security_groups  = ["${aws_security_group.service_security_group.id}"] # Setting the security group
  }
}



# Security Group
resource "aws_security_group" "service_security_group" {
  ingress {
    from_port = 0
    to_port   = 0
    protocol  = "-1"
    # Only allowing traffic in from the load balancer security group
    security_groups = ["${aws_security_group.load_balancer_security_group.id}"]
  }

  egress {
    from_port   = 0 # Allowing any incoming port
    to_port     = 0 # Allowing any outgoing port
    protocol    = "-1" # Allowing any outgoing protocol 
    cidr_blocks = ["0.0.0.0/0"] # Allowing traffic out to all IP addresses
  }
}

```





</details>












































# Terraform (Infrastructure as Code) to build out your services
- Why? 
  - To document all the services that are being used
  - Repeatable & reusable solution
  - Tare down all the services created with Terraform because TF creates an inventory of all the services in a state file

# Terraform for a client-side static web application


## The variable file
- This file is the only `.tf` file where you need to update values the rest of the `.tf` files are totally project agnostic
  ```hcl
  # (./varables.tf)
  #-------------------------------------------
  # Required variables (values passed in via command)
  #-------------------------------------------
  variable domain_name {}
  variable hosted_zone_name {}
  variable env_tags {}

  #-------------------------------------------
  # TF version & State file config
  #-------------------------------------------
  terraform {
    backend "s3" {
      key    = "<YOUR_PROJECT_NAME_HERE>" # this will define the TF state file
      region = "us-west-2"
    }
    required_version = ">= 0.13.5"
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~>3.4"
      }
    }
  }

  #-------------------------------------------
  # Default region
  #-------------------------------------------
  variable "region" {
    default = "us-west-2"
  }
  provider "aws" {
    region = var.region
  }

  #-------------------------------------------
  # Interpolated Values
  #-------------------------------------------
  locals {
    bucket_name = "${var.domain_name}"
    domain_name = "${var.domain_name}"
  }

  #-------------------------------------------
  # Data
  #-------------------------------------------
  data "aws_caller_identity" "current" {}
  ```


## S3
- Use S3 to store the static web files and a second bucket for logging
  ```hcl
  # (./s3.tf)
  resource "aws_s3_bucket" "site" {
    bucket = local.bucket_name
    acl    = "private"
    policy = data.aws_iam_policy_document.website_s3_policy.json

    website {
      index_document = "index.html"
      error_document = "404.html"
    }

    tags = {
      Environment = var.env_tags
      Created_with = "Terraform"
    }
  }

  resource "aws_s3_bucket" "log_bucket" {
    bucket = "${local.bucket_name}-logs"
    acl    = "log-delivery-write"
  }
  ```

## Policies
- This policie only allows access via CloudFront to serve the webcontent
  ```hcl
  # (./policies.tf)
  data "aws_iam_policy_document" "website_s3_policy" {
    statement {
      actions   = ["s3:GetObject"]
      resources = ["arn:aws:s3:::${local.bucket_name}/*"]

      principals {
        type        = "AWS"
        identifiers = ["${aws_cloudfront_origin_access_identity.website_origin_access_identity.iam_arn}"]
      }
    }
  }
  ```
## Route53
- Make sure that you purchase your domain name beforehand because we will need the Hosted Zone Id
- We will use TF to create an `A` record to connect to the CloudFront instance
  ```hcl
  # (./route53.tf)
  resource "aws_route53_record" "domain" {
    name    = local.domain_name
    zone_id = data.aws_route53_zone.base.zone_id
    type    = "A"
    alias {
      name                   = aws_cloudfront_distribution.website_cdn.domain_name
      zone_id                = aws_cloudfront_distribution.website_cdn.hosted_zone_id
      evaluate_target_health = true
    }
  }

  data "aws_route53_zone" "base" {
    name         = "${var.hosted_zone_name}."
    private_zone = false
  }
  ```
## ACM for certs
- ACM provides an elegant wayt to convert  a cumbersome multi-step process into a single step, however when combined with Terraform this process is a little more complex because some processes have to happen in senquential steps
- Some of the TF modules include:
  - `aws_acm_certificate`: To request a certificate for example.com
  - `aws_route53_record`: To create a DNS record to validate the certificate request
  - `aws_certificate_validation`: To ensure that ACM validates our DNS record before certificate use
- In an effort to reduce the timming steps, [azavea's team](https://www.azavea.com/) assembled a reusable [Terraform module](https://github.com/azavea/terraform-aws-acm-certificate) to encapsulate the ACM and Route 53 resources used. Using the output from the validation resource ensures that Terraform will wait for ACM to validate the certificate before resolving its ARN. Now, the process of creating, validating, and waiting for a valid certificate looks like this:
  ```hcl
  # (./certs.tf)
  data "aws_route53_zone" "base" {
    name         = "${var.hosted_zone_name}."
    private_zone = false
  }

  provider "aws" {
    region = "us-east-1"
    alias  = "certificates"
  }

  provider "aws" {
    region = var.region
    alias  = "dns"
  }

  module "cert" {
    source = "github.com/azavea/terraform-aws-acm-certificate?ref=3.0.0"

    providers = {
      aws.acm_account     = aws.certificates
      aws.route53_account = aws.dns
    }

    domain_name                       = local.domain_name
    hosted_zone_id                    = data.aws_route53_zone.base.zone_id
    validation_record_ttl             = "60"
    allow_validation_record_overwrite = true
  }

  resource "aws_route53_record" "domain" {
    name    = local.domain_name
    zone_id = data.aws_route53_zone.base.zone_id
    type    = "A"
    alias {
      name                   = aws_cloudfront_distribution.website_cdn.domain_name
      zone_id                = aws_cloudfront_distribution.website_cdn.hosted_zone_id
      evaluate_target_health = true
    }
  }
  ```

# CloudFront
- CloudFront allows for global distribution of our web content with the ability to cache content at AWS edge locations
- The CloudFront configuration is kind of a beast
  ```hcl
  # (./cloudfront.tf)
  resource "aws_cloudfront_origin_access_identity" "website_origin_access_identity" {
    comment = "site ${terraform.workspace} Access Identity"
  }


  resource "aws_cloudfront_distribution" "website_cdn" {
    origin {
      domain_name = aws_s3_bucket.site.bucket_regional_domain_name
      origin_id   = "origin-bucket-${aws_s3_bucket.site.id}"

      s3_origin_config {
        origin_access_identity = aws_cloudfront_origin_access_identity.website_origin_access_identity.cloudfront_access_identity_path
      }
    }

    enabled             = true
    is_ipv6_enabled     = true
    default_root_object = "index.html"

    logging_config {
      include_cookies = false
      bucket          = aws_s3_bucket.log_bucket.bucket_domain_name
      prefix          = "cloudfront_logs"
    }

    aliases = [local.domain_name]

    default_cache_behavior {
      allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = "origin-bucket-${aws_s3_bucket.site.id}"

      forwarded_values {
        query_string = "true"

        cookies {
          forward = "none"
        }
      }

      viewer_protocol_policy = "redirect-to-https"
      compress               = true
      min_ttl                = 0
      default_ttl            = 300
      max_ttl                = 1200
    }

    # Cache behavior with precedence 0
    ordered_cache_behavior {
      path_pattern     = "/index.html"
      allowed_methods = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD", "OPTIONS"]
      target_origin_id = "origin-bucket-${aws_s3_bucket.site.id}"

      forwarded_values {
        query_string = "true"

        cookies {
          forward = "none"
        }
      }

      min_ttl                = 0
      default_ttl            = 0
      max_ttl                = 0
      compress               = true
      viewer_protocol_policy = "redirect-to-https"
    }

    custom_error_response {
      error_code = "404"
      response_code      = "200"
      response_page_path = "/index.html"
    }
    
    custom_error_response {
      error_code = "403"
      response_code      = "200"
      response_page_path = "/index.html"
    }

    price_class = "PriceClass_100" # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/PriceClass.html

    restrictions {
      geo_restriction {
        restriction_type = "none"
      }
    }

    viewer_certificate {
      acm_certificate_arn      = module.cert.arn
      ssl_support_method       = "sni-only"
      minimum_protocol_version = "TLSv1"
    }

    lifecycle {
      ignore_changes = [tags]
    }

    tags = {
      Environment = var.env_tags
      Created_with = "Terraform"
    }
  }
  ```
## Finally the `.tfvars` file
- Creating a `.tfvar` file allows you to deploy this applications to multiple environments (dev|statging|prod)
  ```hcl
  # (./env_configs/prod.tfvars)
  domain_name      = "myawesomesite.com"
  hosted_zone_name = "myawesomesite.com"
  env_tags          = "Production"
  ```
- Now running this
  ```shell
  # *NOTE* run these commands in the terraform folder

  export AWS_PROFILE="<YOUR_AWS_PROFILE_HERE>"
  CLIENT_BUCKET_NAME="<YOUR_AWS_S3_BUCKET_NAME>"
  TERRAFORM_STATE_BUCKET_NAME="<YOUR_TF_REMOTE_STATE_BUCKET_NAME>"

  # Environment variables
  WORKSPACE="prod"
  VAR_FILE="./env/prod.tfvars"

  # TF version
  tf_ver="v0.13.5"; if [[ ! $(Terraform --version) =~ "Terraform $tf_ver" ]]; then echo "Terraform $tf_ver is required"; exit 1; fi

  # Cleanup .terraform
  rm -rf .terraform/

  # Deploy terraform
  echo "[Running] terraform"
  terraform init -backend-config bucket="${TERRAFORM_STATE_BUCKET_NAME}"

  # If the workspace does not exist, create it.
  if ! terraform workspace select ${WORKSPACE}; then terraform workspace new ${WORKSPACE}; fi
  terraform apply -auto-approve -var-file=$VAR_FILE

  cd .. # where the package.json file exist

  # Build the static files
  echo "[Build] production version of the website]"
  yarn
  yarn run build

  # Upload the source code to AWS S3
  echo "[Upload] website content"
  aws s3 rm s3://$CLIENT_BUCKET_NAME/  --recursive
  aws s3 sync dist/ s3://$CLIENT_BUCKET_NAME/ --exclude \"*.DS_Store*\"
  aws s3 cp dist/index.html s3://$CLIENT_BUCKET_NAME/ --cache-control max-age=0
  ```




## CloudFront add a secondary failover origin
- Create a bucket and a CloudFront ditribution:
  ```hcl
  variable "primary_bucket_name"{
    default = "my-awesome-site"
  }

  variable "s3_origin_id" {
    default = "myS3Origin"
  }

  # Primary Origin
  data "aws_iam_policy_document" "primary_origin_website_s3_policy" {
    statement {
      sid       = "bucket_policy_for_primary"
      actions   = ["s3:GetObject"]
      effect    = "Allow"
      resources = ["arn:aws:s3:::${var.primary_bucket_name}/*"]

      principals {
        type        = "AWS"
        identifiers = [aws_cloudfront_origin_access_identity.website_origin_access_identity.iam_arn]
      }
    }
  }
  resource "aws_s3_bucket" "primary_origin" {
    bucket = var.primary_bucket_name
    acl    = "private"
    policy = data.aws_iam_policy_document.primary_origin_website_s3_policy.json

    website {
      index_document = "index.html"
      error_document = "404.html"
    }

    tags = {}

    force_destroy = true
  }



  # CloudFront (With single origin)
  resource "aws_cloudfront_origin_access_identity" "website_origin_access_identity" {
    comment = "site ${terraform.workspace} Access Identity"
  }

  resource "aws_cloudfront_distribution" "s3_distribution" {
    origin {
      domain_name = aws_s3_bucket.primary_origin.bucket_regional_domain_name
      origin_id   = var.s3_origin_id

      s3_origin_config {
        origin_access_identity = aws_cloudfront_origin_access_identity.website_origin_access_identity.cloudfront_access_identity_path
      }
    }

    enabled             = true
    is_ipv6_enabled     = true
    comment             = "Some comment"
    default_root_object = "index.html"

    logging_config {
      include_cookies = false
      bucket          = "mylogs.s3.amazonaws.com"
      prefix          = "myprefix"
    }

    aliases = ["mysite.example.com", "yoursite.example.com"]

    default_cache_behavior {
      allowed_methods  = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
      cached_methods   = ["GET", "HEAD"]
      target_origin_id = var.s3_origin_id

      forwarded_values {
        query_string = false

        cookies {
          forward = "none"
        }
      }

      viewer_protocol_policy = "allow-all"
      min_ttl                = 0
      default_ttl            = 3600
      max_ttl                = 86400
    }

    # Cache behavior with precedence 0
    ordered_cache_behavior {
      path_pattern = "/index.html"
      allowed_methods  = ["GET", "HEAD", "OPTIONS"]
      cached_methods   = ["GET", "HEAD", "OPTIONS"]
      target_origin_id = var.s3_origin_id

      forwarded_values {
        query_string = "true"
        cookies {
          forward = "none"
        }
      }

      min_ttl                = 0
      default_ttl            = 86400
      max_ttl                = 31536000
      compress               = true
      viewer_protocol_policy = "redirect-to-https"
    }

    price_class = "PriceClass_200"

    restrictions {
      geo_restriction {
        restriction_type = "none"
      }
    }

    tags = {
      Environment = "production"
    }

    viewer_certificate {
      cloudfront_default_certificate = true
    }
  }
  ```
- Now add a second bucket in another region and update your CloudFront config block to allow for secondary origin
  ```hcl
  # Add a bucket in another region
  provider "aws" {
    region = "eu-west-1"
    alias  = "failover_region"
  }

  variable "secondary_bucket_name"{
    default = "my-awesome-site-failover"
  }

  # Secondary Bucket
  data "aws_iam_policy_document" "secondary_origin_website_s3_policy" {
    provider = aws.failover_region

    statement {
      sid       = "bucket_policy_for_secondary"
      actions   = ["s3:GetObject"]
      effect    = "Allow"
      resources = ["arn:aws:s3:::${var.secondary_bucket_name}/*"]

      principals {
        type        = "AWS"
        identifiers = [aws_cloudfront_origin_access_identity.website_origin_access_identity.iam_arn]
      }
    }
  }
  resource "aws_s3_bucket" "secondary_origin" {
    provider = aws.failover_region

    bucket = var.secondary_bucket_name
    acl    = "private"
    policy = data.aws_iam_policy_document.secondary_origin_website_s3_policy.json

    website {
      index_document = "index.html"
      error_document = "404.html"
    }

    tags = {}

    force_destroy = true
  }


  # Update your cloudfront distribution
  resource "aws_cloudfront_distribution" "s3_distribution" {
    # Add an `origin group`
    origin_group {
      origin_id = "OriginWithFailover"

      failover_criteria {
        status_codes = [403, 404, 500, 502]
      }

      # *NOTE: this order matters! (first one will be the primary)
      member {
        origin_id = "primaryS3"
      }

      member {
        origin_id = "failoverS3"
      }
    }

    # Add a second origin
    origin {
      domain_name = aws_s3_bucket.secondary_origin.bucket_regional_domain_name
      origin_id   = "failoverS3"

      s3_origin_config {
        origin_access_identity = aws_cloudfront_origin_access_identity.website_origin_access_identity.cloudfront_access_identity_path
      }
    }

    default_cache_behavior {
      target_origin_id = "OriginWithFailover"

      allowed_methods = ["GET", "HEAD", "OPTIONS"]
      cached_methods  = ["GET", "HEAD"]
      # *...
    }

    ordered_cache_behavior {
      target_origin_id = "OriginWithFailover"

      allowed_methods = ["GET", "HEAD", "OPTIONS"] # Note 
      cached_methods  = ["GET", "HEAD"]
      # *...
    }

    # *...
  }
  ```
- Now you can test it by uploading this below HTML to the bucket in the `eu-west-1` and leave the `us-west-2` empty for now
  ```html
  <!doctype html>
  <html lang="en">
  <head>
    <title>eu-west-1</title>
  </head>
  <body>
    <h1>eu-west-1</h1>
    <img src="image.jpg">
  </body>
  </html>
  ```
- If you go to the CloudFront URL, you should see a site that says `eu-west-1`
- Now Add the below html to the `us-west-2` bucket:
  ```html
  <!doctype html>
  <html lang="en">
  <head>
    <title>us-west-2</title>
  </head>
  <body>
    <h1>us-west-2</h1>
    <img src="image.jpg">
  </body>
  </html>
  ```
- If you refresh your browser you should now see `us-west-2`




