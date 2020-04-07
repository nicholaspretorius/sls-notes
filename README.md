# Serverless Notes App

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

`sls deploy -v`

* Deploy a single function: 

`serverless deploy function -f Billing`