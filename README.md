# Serverless Notes App

Notes app using Node.js, Serverless framework and AWS. According to the series at [Serverless Stack](https://serverless-stack.com/)

## Developer Notes

* To test functions locally, from the terminal run (take note of the AWS_PROFILE is you have multiple AWS profiles - this is not needed if you only have one profile): 

`AWS_PROFILE=serverless-user serverless invoke local --function CreateNote --path src/mocks/createNoteEvent.json`

### API

API URL: https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev

* POST /notes https://lz2ymosryl.execute-api.eu-west-1.amazonaws.com/dev/notes