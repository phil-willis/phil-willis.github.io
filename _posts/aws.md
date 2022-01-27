---
title: 'aws'
excerpt: ''
coverImage: '/assets/covers/aws.jpg'
ogImage:
  url: '/assets/covers/aws.jpg'
---



# AWS CLI
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
- You can access your AWS services via:
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
    ![Security Page](public/assets/blog/aws/credentials_1.jpg)
  2. Click the `Access keys (access key ID and secret access key)` accordion title and click `Create New Access Key`
    ![Security Page](public/assets/blog/aws/credentials_2.jpg)
  3. Click `Show Access Key` to have it displayed on the screen. Note, that you can download it to your machine as a file and open it whenever needed. To download it, just click the `Download Key File` button.
    ![Security Page](public/assets/blog/aws/credentials_2.jpg)
  4. Now update your `~/.aws/credentials` file with this key pair
    ```shell
    [default]
    aws_access_key_id=AAAAAAAAAAAAAEXAMPLE
    aws_secret_access_key=123456789123456789
    ```




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









# PostGIS
- [](https://www.martinpeters.ie/2020/02/01/cdk-rds-postgis-setup/)




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