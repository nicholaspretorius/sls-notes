# Serverless Notes App

[![Build Status](https://travis-ci.com/nicholaspretorius/sls-notes.svg?branch=dev)](https://travis-ci.com/nicholaspretorius/sls-notes)

Notes app using Node.js, Serverless framework and AWS. According to the series at [Serverless Stack](https://serverless-stack.com/)

## Developer Notes

* To test functions locally, from the terminal run (take note of the AWS_PROFILE is you have multiple AWS profiles - this is not needed if you only have one profile): 

### API

API URL: https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev

* POST /notes https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/notes

`AWS_PROFILE=serverless-user serverless invoke local --function CreateNote --path src/mocks/createNoteEvent.json`

* GET /notes/{noteId} https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/notes/{noteId}

`AWS_PROFILE=serverless-user serverless invoke local --function GetNote --path src/mocks/getNoteEvent.json`

* GET /notes https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/notes

`AWS_PROFILE=serverless-user serverless invoke local --function GetNotes --path src/mocks/getNotesEvent.json`

* PUT /notes/{noteId} https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/notes/{noteId}

`AWS_PROFILE=serverless-user serverless invoke local --function UpdateNote --path src/mocks/updateNoteEvent.json`

* DELETE /notes/{noteId} https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/notes/{noteId}

`AWS_PROFILE=serverless-user serverless invoke local --function DeleteNote --path src/mocks/deleteNoteEvent.json`

* POST /billing https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/billing

`AWS_PROFILE=serverless-user serverless invoke local --function Billing --path src/mocks/billingEvent.json`

### Tests

* Test will run once: 

`npm test`

### Deployment

* Deploy the entire application: 

`sls deploy -v` -v displays out put

`sls deploy -s dev` -s deploys to stage 'dev'

* Deploy a single function: 

`serverless deploy function -f Billing`

### Cognito Auth

In order to authenticate with Cognito without using a frontend client, you can do the following using a tool called [aws-api-gateway-cli-test](https://github.com/AnomalyInnovations/aws-api-gateway-cli-test): 

If installed globally, the command is: `apig-test`

```
npx aws-api-gateway-cli-test \
--username='admin@example.com' \
--password='Passw0rd!' \
--user-pool-id='YOUR_COGNITO_USER_POOL_ID' \
--app-client-id='YOUR_COGNITO_APP_CLIENT_ID' \
--cognito-region='YOUR_COGNITO_REGION' \
--identity-pool-id='YOUR_IDENTITY_POOL_ID' \
--invoke-url='YOUR_API_GATEWAY_URL' \
--api-gateway-region='YOUR_API_GATEWAY_REGION' \
--path-template='/notes' \
--method='POST' \
--body='{"content":"hello world","attachment":"hello.jpg"}'
```

Populated: 

```
npx aws-api-gateway-cli-test \
--username='nicholaspretorius@gmail.com' \
--password='Passw0rd!' \
--user-pool-id='eu-west-1_iqrXNOPhZ' \
--app-client-id='4kmdbsn7s9va7lvslk1ntv48u9' \
--cognito-region='eu-west-1' \
--identity-pool-id='eu-west-1:51eb39a2-6a02-47e6-8784-313ba2c7a288' \
--invoke-url='https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev' \
--api-gateway-region='eu-west-1' \
--path-template='/notes' \
--method='POST' \
--body='@src/mocks/createNoteEvent.json'
```

* Can also use --body='@src/mocks/createNoteEvent.json'

Response: 

```
{
  status: 201,
  statusText: 'Created',
  data: {
    userId: 'eu-west-1:c3a84c65-0a55-4f51-ae0b-0f1bc707b5dc',
    noteId: 'b05924d0-7978-11ea-a620-0d36c04be141',
    createdAt: 1586336984989
  }
}
```

#### Confirm an unauthenticated user

A quick note on the [signup flow](https://serverless-stack.com/chapters/signup-with-aws-cognito.html) here. If the user refreshes their page at the confirm step, they won’t be able to get back and confirm that account. It forces them to create a new account instead. We are keeping things intentionally simple but here are a couple of hints on how to fix it.

1. Check for the `UsernameExistsException` in the `handleSubmit` function’s catch block.
2. Use the `Auth.resendSignUp()` method to resend the code if the user has not been previously confirmed. Here is a link to the [Amplify API](https://aws.github.io/aws-amplify/api/classes/authclass.html#resendsignup) docs.
3. Confirm the code just as we did before.

```
aws cognito-idp admin-confirm-sign-up \
   --region YOUR_COGNITO_REGION \
   --user-pool-id YOUR_COGNITO_USER_POOL_ID \
   --username YOUR_USER_EMAIL
```

```
aws cognito-idp admin-confirm-sign-up \
   --region eu-west-1 \
   --user-pool-id eu-west-1_iqrXNOPhZ \
   --username nicholaspre@icloud.com
```

#### Further Examples

* To pass in path parameters with your request.

```
npx aws-api-gateway-cli-test \
--username='email@example.com' \
--password='password' \
--user-pool-id='abc' \
--app-client-id='def' \
--cognito-region='us-east-1' \
--identity-pool-id='ghi' \
--invoke-url='https://123.execute-api.us-east-1.amazonaws.com/prod' \
--api-gateway-region='us-east-1' \
--path-template='/notes/{id}' \
--params='{"id":"456"}' \
--method='GET'
```

* To pass in query parameters and headers with your request.

```
npx aws-api-gateway-cli-test \
--username='email@example.com' \
--password='password' \
--user-pool-id='abc' \
--app-client-id='def' \
--cognito-region='us-east-1' \
--identity-pool-id='ghi' \
--invoke-url='https://123.execute-api.us-east-1.amazonaws.com/prod' \
--api-gateway-region='us-east-1' \
--path-template='/notes' \
--additional-params='{"queryParams":{"param0":"abc"},"headers":{"param1":"123"}}' \
--method='GET'
```

### Frontend

The frontend client is contained within the "client" folder in the root. Change into "client" and run: `npm start`

Favicons generated from [Real Favicon Generator](https://realfavicongenerator.net/)

#### Stripe

Read more about [Stripe here](https://stripe.com/docs/testing#cards):

* A Stripe test card number is 4242 4242 4242 4242.
* You can use any valid expiry date, security code, and zip code.
* And set any name.

### CI/CD

Travis CI is used to deploy the API to AWS on `git push` to master branch. 

See [here](https://seed.run/blog/how-to-build-a-cicd-pipeline-for-serverless-apps-with-travis-ci) for more [info](https://serverless-stack.com/chapters/automating-serverless-deployments.html). 