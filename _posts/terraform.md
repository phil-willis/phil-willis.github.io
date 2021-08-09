---
title: 'terraform'
excerpt: ''
coverImage: '/assets/blog/hello-world/cover.jpg'
ogImage:
  url: '/assets/blog/hello-world/cover.jpg'
---

## What is Terraform
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

(1) configurations: i declare the intent
(2) State: current state
- dry run `$ terraform plan`


## Install
- You can install TF with homebrew but it's better to install it with `tfswitch` with homebrew
- [Terraform version manager](https://warrensbox.github.io/terraform-switcher/)
- this will allow you to switch version very easily
  ```
  $ brew install warrensbox/tap/tfswitch
  $ tfswitch 0.12.4
  $ terraform -v
  ```


## Save remote-state in S3
- [docs](https://www.terraform.io/docs/backends/types/s3.html)
- It is highly recommended that you enable Bucket Versioning on the S3 bucket to allow for state recovery in the case of accidental deletions and human error.
- Paths to the state file inside the bucket: _`<bucket>/<workspace_key_prefix>/<workspace_name>/<key>`_
  ```hcl
  terraform {
    backend "s3" {
      bucket = "mybucket"
      key    = "path/to/my/key"
      region = "us-east-1"
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



## Terraform CLI
- [Terraform CLI](https://www.terraform.io/docs/commands/index.html)
- `$ terraform workspace (list|select|new|delete|show)`
  ```shell
  $ terraform init
  $ terraform plan
  $ terraform apply
  $ terraform apply -auto-approve
  $ terraform output
  $ terraform validate
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



# Terraform Plugins
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
  



## Variable
- You can define variables and provide `default` value, `description`, as well as assign a `type`
  ```hcl
  variable "some_variable" {
    type = string
    default = "hello"
    description = "This is an example of a variable that has a string type"
  }
  ```
- You can also override variables by passing in them as a flag when you run a terraform command
  ```
  $ terraform apply -var env="prod"
  ```
- Basic variable types are: string/list/map:
- The basic structure of defining a variable is:
  ```hcl
  variable "key" {
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




## Locals (Local Value Configuration)
- locals are like variables that you can pass in ${dynamic} values
- DRY principles, allows you to preform logic to create a value where you don't have to write every time
- eg of locals
```hcl
  locals {
    name_prefix = "${var.name_prefix != "" ? var.name_prefix : var.deployment_mame}"
  }
  resource "aws_iam_role" "instance1" {
    name_prefix = "${local.name_prefix}"
    ...
  }
  resource "aws_iam_role" "instance2" {
    name_prefix = "${local.name_prefix}"
    ...
  }
  ```

- example WITHOUT locals
  ```hcl
  resource "aws_iam_role" "instance1" {
    name_prefix = "${var.name_prefix != "" ? var.name_prefix : var.deployment_name}"
    ...
  }
  resource "aws_iam_role" "instance2 " {
    name_prefix = "${var.name_prefix != "" ? var.name_prefix : var.deployment_mame}"
    ...
  }
  ```







## Provider
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





## Data
- Get information on an existing resource
- aws_route53_zone
- aws_caller_identity
- aws_acm_certificate



## Resource
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




## Provisioners
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




## Outputs
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


# workspace
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



# Terraform auto-approve apply
```shell
$ terraform apply -auto-approve
```






## Modules
- it's like a class for terraform, it encapsulate a piece of configuration
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
- minimal folder structure
  ```shell
  .
  ├── README.md
  ├── main.tf
  ├── variables.tf
  ├── outputs.tf
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
  - example of using modules source
    ```hcl
    module "consul" {
      source = "./consul"
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




























