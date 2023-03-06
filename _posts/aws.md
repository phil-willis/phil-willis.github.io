---
title: 'aws'
excerpt: ''
coverImage: '/assets/covers/aws.jpg'
ogImage:
  url: '/assets/covers/aws.jpg'
---





<details>
<summary>AWS CLI</summary>

- Installing the AWS CLI [Docs here](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- For macOS [download](https://awscli.amazonaws.com/AWSCLIV2.pkg)
  - You can install to any folder, or choose the recommended default folder of `/usr/local/aws-cli`.
  - The installer automatically creates a symlink at `/usr/local/bin/aws` that links to the main program in the installation folder you chose.
- Check to see if it's installed properly
  ```shell
  $ which aws
  /usr/local/bin/aws 
  $ aws --version
  aws-cli/2.4.5 Python/3.8.8 Darwin/18.7.0 botocore/2.4.5
  ```
- You can access your AWS services via ([more on profiles here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)):
  1. Named profiles
    - AWS uses `~./aws/credentials` file for accessing your AWS accounts where you can have multiple profiles but you should probably have a `default` profile
      ```shell
      [default]
      aws_access_key_id=AAAAAAAAAAAAAEXAMPLE
      aws_secret_access_key=123456789123456789

      [user1]
      aws_access_key_id=BBBBBBBBBBBBBEXAMPLE
      aws_secret_access_key=12345678923456789
      ```
    - You can also define the default regions for each profile in `~/.aws/config`
      ```shell
      [default]
      region=us-west-2
      output=json

      [profile user1]
      region=us-east-1
      output=text
      ```
    - List profiles
      ```shell
      $ aws configure list-profiles
      $ aws configure list
      ```

    - Accessing a specific profile's resources you just have to pass in the `--profile <PROFILE_NAME>`
      ```shell
      $ aws s3 ls --profile default
      ```

  2. Environment variables
    - You can also pass in environment variables access key/secrets
      ```shell
      $ export AWS_ACCESS_KEY_ID=BBBBBBBBBBBBBEXAMPLE
      $ export AWS_SECRET_ACCESS_KEY=12345678923456789
      $ export AWS_DEFAULT_REGION=us-west-2
      ```
- Now, getting your `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` values
  1.  Go to Amazon Web Services console and click on the name of your account (it is located in the top right corner of the console). Then, in the expanded drop-down list, select `Security Credentials`.
    ![Security Page](/assets/blog/aws/credentials_1.jpg)
  2. Click the `Access keys (access key ID and secret access key)` accordion title and click `Create New Access Key`
    ![Security Page](/assets/blog/aws/credentials_2.jpg)
  3. Click `Show Access Key` to have it displayed on the screen. Note, that you can download it to your machine as a file and open it whenever needed. To download it, just click the `Download Key File` button.
    ![Security Page](/assets/blog/aws/credentials_2.jpg)
  4. Now update your `~/.aws/credentials` file with this key pair
    ```shell
    [default]
    aws_access_key_id=AAAAAAAAAAAAAEXAMPLE
    aws_secret_access_key=123456789123456789
    ```

</details>





<details>
<summary>S3</summary>
- AWS Lambda provides various ways to access secrets or sensitive data securely. Here are a few of the most common methods:

  1. `AWS Systems Manager Parameter Store`: This is a managed service that lets you store and retrieve secrets, such as database credentials and API keys. You can access the secrets in a Lambda function by using the AWS Systems Manager API, AWS CLI, or SDK.

  2. `AWS Secrets Manager`: This is a fully managed service that enables you to store, rotate, and retrieve secrets securely. You can access the secrets in a Lambda function by using the AWS Secrets Manager API, AWS CLI, or SDK.

  3. `Environment Variables`: You can store secrets as environment variables in a Lambda function. These secrets are encrypted and protected by the Lambda service-linked role.

  4. `IAM Role`: You can assign an IAM role to a Lambda function that has permissions to access the secrets. For example, you can assign a role that has read-only access to the secrets stored in AWS Secrets Manager or the AWS Systems Manager Parameter Store.

- Regardless of the method you choose, it's important to ensure that the secrets are stored securely and protected from unauthorized access. You should also consider rotating the secrets on a regular basis and limiting the permissions of the roles and services that access the secrets.



</details>




<details>
<summary>IAM</summary>

# IAM (Identity and Access Management)
- `AWS IAM` is a web service that helps you securely control access to AWS resources. IAM enables you to manage users, groups, and permissions to AWS resources. With IAM, you can create and manage AWS users and groups, and use permissions to allow and deny access to AWS resources.
- An `AWS policy `is a document that defines one or more permissions. AWS policies are written in JSON and specify the actions that a user, group, or role is allowed or denied to perform on AWS resources. For example, you can create a policy that allows a user to perform only read operations on Amazon S3 buckets, or a policy that allows a group to launch EC2 instances.
- Policies can be attached to AWS users, groups, or roles. When a policy is attached to a user, it defines what that user can do in the AWS environment. When a policy is attached to a group, it defines the permissions for all users in that group. When a policy is attached to a role, it defines the permissions for applications or services that assume the role.
- AWS provides a number of managed policies that you can use as building blocks for your policies. For example, the AmazonS3ReadOnlyAccess policy provides read-only access to Amazon S3 buckets. You can also create custom policies, either by creating a new policy from scratch or by modifying an existing policy.
- Here's an example of a simple AWS policy to allow read access to an Amazon S3 bucket:
  ```json
  {
      "Version": "2012-10-17",
      "Statement": [
          {
              "Effect": "Allow",
              "Action": [
                  "s3:GetObject",
                  "s3:ListBucket"
              ],
              "Resource": [
                  "arn:aws:s3:::<YOUR_BUCKET_NAME>",
                  "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
              ]
          }
      ]
  }
  ```
- This policy uses the "Effect" of "Allow" to specify that the policy allows read access to the S3 bucket. The "Action" section lists the specific S3 actions that are allowed (s3:GetObject and s3:ListBucket), and the "Resource" section specifies the ARN (Amazon Resource Name) of the S3 bucket and its contents (<YOUR_BUCKET_NAME> and <YOUR_BUCKET_NAME>/*).
- Note that in the <YOUR_BUCKET_NAME> placeholder in the ARN, you would replace it with the actual name of the S3 bucket you want to grant read access to.
- You can attach this policy to an IAM user, group, or role to grant read access to the specified S3 bucket.






</details>









<details>
<summary>S3</summary>

# S3
- Storage
</details>







<details>
<summary>CloudWatch</summary>

# CloudWatch
- CloudWatch enables you to monitor your complete stack (applications, infrastructure, network, and services) and use alarms, logs, and events data to take automated actions and reduce mean time to resolution (MTTR). This frees up important resources and allows you to focus on building applications and business value.
- You can create Dashboards, Alarms, or just query the logs
## Logs
- You have 2 options: `Log Goups` or `Log Insights`
- `Log Insights` is better
- Select a log group(s) then run a query
  ```
  fields @timestamp, @message, @logStream, @log
  | sort @timestamp desc
  | limit 20
  ```
- Allowed filtering options are:
  ```html
  'in', 'and', 'or', 'not', 'like', '=~', '~=', '|', '|>', '^', '*', '/', '%', '+', '-', '<', '>', '<=', '>=', '=', '!='
  ```
- You can also regex console.log event you've done in your Lambdas like:
  ```
  fields @timestamp, @message, @logStream, @log
  | sort @timestamp desc
  | filter @message like /????/
  | limit 20
  ```
- Learn more about queries [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax-examples.html)
</details>








<details>
<summary>CLoudFront</summary>

# CLoudFront
- Distribute your static content at AWS edge locations
</details>








<details>
<summary>ACM</summary>

# ACM
- AWS Certificate Manager is a service provided by Amazon that issues on-demand TLS certificates at no cost. Much like Let’s Encrypt, Amazon controls the Certificate Authority (Amazon Trust Services, LLC) behind the certificates, as well as the accompanying API to manage them.
- Amazon Certificate Manager (ACM) provides an elegant wayt to convert  a cumbersome multi-step process (the process of provisioning, validating, and configuring Transport Layer Security (TLS) certificates) into a single step
- ACM certificates can only be associated with AWS Elastic and Application Load Balancers, CloudFront distributions, and API Gateway endpoints.
</details>










<details>
<summary>Route53</summary>

# Route53
- Route end users to your site reliably with globally-dispersed Domain Name System (DNS) servers and automatic scaling.
</details>








<details>
<summary>API Gateway</summary>

# API Gateway
- Allows you to make RESTful applications
- There's 4 types of API Gateway offering:
  - [HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api.html)
  - [REST API](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-rest-api.html)
  - REST API (private)
  - WebSocket API

- `REST APIs `support more features than `HTTP APIs`, while `HTTP APIs` are designed with minimal features so that they can be offered at a lower price. You can read more [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-vs-rest.html)
- When you add a new endpoint you have to create a `resource` then add the http `methods` you want

## Custom Authorizer
- [Here's a great writeup on Lambda Custom Authorizers](https://www.alexdebrie.com/posts/lambda-custom-authorizers/)
- API Gateway provides an HTTP API endpoint that is fully configurable. You define the HTTP resources (like /user), the HTTP methods on that resources (like POST, GET, DELETE, …) and the integration (e.g. Lambda function) that should be called to process the request. A Lambda function can then run whatever logic is needed to answer the request. The Lambda function returns its result to the API Gateway. The API Gateway responds to the caller. The following figure demonstrates this flow.
  ![api-gateway-flow](/assets/blog/aws/api-gateway-flow.jpg)  

- You could include the authentication and authorization logic into the Lambda function that handles the request. But you can also separate concerns, make use of API Gateway caching mechanism, and go for Custom Authorization. API Gateway will invoke another Lambda function (Auth Lambda Function) for the first request and caches that result for a configurable duration. Caching will reduce the overhead (latency and DynamoDB charges) for authentication and authorization to a minimum.
  ![api-gateway-flow_custom-authorizer](/assets/blog/aws/api-gateway-flow_custom-authorizer.jpg)
- You can use whatever logic you like to decide if a request is allowed or not. Here I will implement an API token mechanism. All HTTP requests from clients must pass an Authorization: xyz header. The Auth Lambda Function will take this token to query a DynamoDB table. The request is allowed or denied depending on if the query matches.

- The code for the Auth Lambda Function is responsible for looking up the token. The Authorization HTTP header field is used to transmit the token. You can use Node.js and the AWS SDK for JavaScript to implement this logic. API Gateway will pass an event to our function like this:
  ```json
  {
    "type":"TOKEN",
    "authorizationToken":"<caller-supplied-token>",
    "methodArn":"arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"
  }
  ```
- API Gateway expects that we respond in the following way:
  ```json
  {
    "principalId": "xyz",
    "policyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": "execute-api:Invoke",
          "Effect": "Allow", // or Deny
          "Resource": "arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"
        }
      ]
    }
  }
  ```
- A simple implementation looks like this:
  ```js
  var AWS = require('aws-sdk');
  var dynamodb = new AWS.DynamoDB();

  function generatePolicy(principalId, effect, resource) {
    return {
      'principalId': principalId,
      'policyDocument': {
        'Version': '2012-10-17',
        'Statement': [{
          'Action': 'execute-api:Invoke',
          'Effect': effect,
          'Resource': resource
        }]
      }
    };
  }

  exports.handler = function(event, context, cb) {
    var token = event.authorizationToken;
    dynamodb.getItem({
      "Key": {
        "token": {"S": token}
      },
      "TableName": "auth-token"
    }, function(err, data) {
      if (err) {
        cb(err);
      } else {
        if (data.Item === undefined) {
          cb(null, generatePolicy('user', 'Deny', event.methodArn));
        } else {
          cb(null, generatePolicy('user', 'Allow', event.methodArn));
        }
      }
    });
  };
  ``` 
- More on Lambda authorizer [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html)
</details>








<details>
<summary>Lambda</summary>

# Lambda
- Serverless functions
</details>







<details>
<summary>Elastic Container Registry (ECR) </summary>

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








<details>
<summary>DynamoDB</summary>

# DynamoDB
- DynamoDB is a NoSQL database service
</details>














<details>
<summary>RDS</summary>

# RDS
- Relational Database Service (RDS)

# PostGIS
- [](https://www.martinpeters.ie/2020/02/01/cdk-rds-postgis-setup/)
</details>










<details>
<summary>Aurora DB</summary>

# Aurora DB
- MySQL and PostgreSQL-compatible relational database built for the cloud. Performance and availability of commercial-grade databases at 1/10th the cost.
- Amazon Aurora is a MySQL and PostgreSQL-compatible relational database built for the cloud, that combines the performance and availability of traditional enterprise databases with the simplicity and cost-effectiveness of open source databases.
- Amazon Aurora is up to five times faster than standard MySQL databases and three times faster than standard PostgreSQL databases.
- DB normally run on an EC and it a pain to scale
- Aurora scale automatically, 
- Aurora make 6 copies of your data distributes around multiple locations
- Continuously backs it up to S3 so your data is safe
- Aurora can also replicate around multiple regions
- It's fully managed 
- Aurora comes in 2 flavors
  - Aurora Basic
  - Aurora Serverless (scales as much as you need and shuts down when you don't need it)
- Aurora uses a data API to access the data, which is different to how you normally connect to a relational database (via connections)
  - Working with Relational Database you have to connect to the DB, do your operations, then closing the connections
  - In the world of Serverless it become a little problematic cause you can have multiple lambda functions and they will all be handling the connections independenly which can lead to problems in your database like running out of open connections, your killing the memory, making it preform really bad
  - You can use an AWS Proxy that sits between your Database and your lambda functions and will handle the connections 
  - You should really just use this if you have legacy DB
  - If you are building a new application, just use the Aurora Serverless and save yourself the headache
- DynamoDB used the model of accessing the DB via the API
- In the serverless world dealing with DB connections is a pain,  
</details>





















<details>
<summary>AWS CDK (AWS Cloud Development Kit)</summary>

# AWS CDK (AWS Cloud Development Kit)
- The AWS CDK (Amazon Web Services Cloud Development Kit) is a [new open source framework](https://github.com/aws/aws-cdk) to define cloud infrastructure in code (Infrastructure as Code) and provisioning it through AWS CloudFormation.
- CDK provides many high level components to allow rapid code development requiring much less input compared to the typical CloudFormation templates. 
- CDK is available in TypeScript, Python, Java and C#.
  ```shell
  # Install globally 
  $ npm i -g aws-cdk

  $ mkdir my-app && cd my-app
  $ cdk init app --language=typescript

  $ npm i @aws-cdk/aws-apigatewayv2 @aws-cdk/aws-apigatewayv2-integrations @aws-cdk/aws-ec2 @aws-cdk/aws-lambda @aws-cdk/aws-rds @aws-cdk/core source-map-support
  ```
</details>



















<details>
<summary>AWS SAM (AWS Serverless Application Model)</summary>

# AWS SAM (AWS Serverless Application Model)
- SAM is an open-source framework for building serverless applications. 
- You define the services you want in YAML and during the deployment SAM will convert it to CloudFormation syntax
- SAM can be installed with `Homebrew`
- SAM allows you to run your application locally so you can test it out and debug
- SAM is Infrastructure as Code

## Installing SAM on MacOS
- [How to install SAM](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html)
  ```shell
  $ brew tap aws/tap
  $ brew install aws-sam-cli
  $ sam --version

  $ brew upgrade aws-sam-cli
  ```

## Get setup
- Start by scaffolding your application
  ```shell
  # Step 1 - Download a sample application
  $ sam init
  # 1 - AWS Quick Start Templates
  # 1 - Zip (artifact is a zip uploaded to S3)
  # 1 - nodejs14.x
  # AWS quick start application templates:
  #    1 - Hello World Example
  #    2 - Step Functions Sample App (Stock Trader)
  #    3 - Quick Start: From Scratch
  #    4 - Quick Start: Scheduled Events
  #    5 - Quick Start: S3
  #    6 - Quick Start: SNS
  #    7 - Quick Start: SQS
  #    8 - Quick Start: Web Backend

  # Step 2 run your code locally
  $ sam local start-api

  # Step 3 - Build your application
  $ cd sam-app
  $ sam build

  # Step 4 - Deploy your application
  $ sam deploy --guided
  # Once everything is deployed it will print out the REST Endpoint `https://<RANDOM_STRING>.execute-api.us-west-2.amazonaws.com/Prod/`
  ```

## Check your stuff out in AWS Console
- You can view your SAM application in AWS Console by going to `Lambda` > `Applications`
  ![aws-console_serverless-application](/assets/blog/aws/aws-console_serverless-application.png)
- You can view your stack my clicking the `CloudFormation`


## Check your stuff within VSCode with the `Serverless Console` extension
- You can use a vscode extension [Serverless Console](https://marketplace.visualstudio.com/items?itemName=devAdvice.serverlessconsole) to view all the logs
  - In vscode click the lighting bolt in the quick look panel
  - Create a connection

   ![serverless-console_connect](/assets/blog/aws/serverless-console_connect.png)

   ![serverless-console_panel](/assets/blog/aws/serverless-console_panel.png)

- Invoke your Lambda function directly 
  ```shell
  $ sam local invoke "HelloWorldFunction" -e events/event.json
  ```

## Cleanup
- To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

  ```shell
  aws cloudformation delete-stack --stack-name <STACK_NAME>
  ```
</details>
