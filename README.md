NodeGoat
==========

Being lightweight, fast, and scalable, Node.js is becoming a widely adopted platform for developing web applications. This project provides an environment to learn how OWASP Top 10 security risks apply to web applications developed using Node.js and how to effectively address them.

How to Install and Run NodeGoat
=================================

### Requirements

1.  Install [Node.js](http://nodejs.org/) - NodeGoat requires **Node v0.10.***
2.  Git command line tools - follow the setup instructions [on GitHub](https://help.github.com/articles/set-up-git) or download [here](http://git-scm.com/downloads)

### Getting a Copy of the Code

Open a command prompt / terminal window and run the command below from the parent directory inside which you would like the NodeGoat code copied.

```
git clone https://github.com/OWASP/NodeGoat.git
```
### Running Your Copy of the Code

* Install node modules

```
cd NodeGoat
npm install
```
* Create and populate DB 

1. Connect to [mongod](http://docs.mongodb.org/manual/reference/program/mongod/#bin.mongod)
2. From a system prompt, start [mongo](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo) by issuing the [mongo](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo) command
3. Paste contents of [nodegoat_db_reset.js](https://github.com/OWASP/NodeGoat/blob/master/nodegoat_db_reset.js) on mongo console

* Start server

```
grunt run
```
This starts the NodeGoat application at url http://localhost:5000/

### Customizing the Default Application Configuration

The default application settings (database url, http port, etc.) can be changed by updating the [config file] (https://github.com/OWASP/NodejsGoat/blob/master/config/env/all.js).


Contributing
=================================

Contributions from community are key to make NodeGoat a high quality comprehensive resource. Make NodeGoat awesome together!


**New to git?** You may find these resources helpful:
* [GitHub's git tutorial](http://try.github.io/)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
* [git tutorials and workflows](https://www.atlassian.com/git/tutorial)

### Ways to Contribute

Depending on your preference, you can contribute in various ways:
* Suggest a vulnerability that can be demonstrated through NodeGoat web app. Start by posting a message on [NodeGoat Google Group](https://groups.google.com/forum/#!forum/nodegoat) to initiate discussion on it.
* Implement vulnerability in the demo web application
* Document vulnerabilities in the tutorial guide
* Add to the in-app tour to walk user through the steps to expose vulnerabilities
* Add tests to failing test suite guide, which contains tests that pass as user fixes vulnerabilities
* Create screencasts to demonstrate how to fix vulnerabilities


### What is the Process
1. Assign a task from [project task list](https://github.com/OWASP/NodeGoat/issues?milestone=2&state=open) to yourself.
2. Implement the changes. 
3. Once code is ready to commit, run command:
  
  ```
  grunt precommit
  ```
  This command indents code using `js-beautifier` and shows any `jsHint` errors. These [coding conventions](https://github.com/OWASP/NodeGoat/blob/master/.jshintrc) are checked using `jsHint`. Resolve all `jsHint` errors before committing the code.

4. Commit the changes by adding [issue number into a commit message](https://help.github.com/articles/closing-issues-via-commit-messages)

### Contributors
Here are the amazing [contributors](https://github.com/OWASP/NodeGoat/graphs/contributors) to NodeGoat project


Report bugs, Feedback, Comments
====================================
*  Contact team by posting a message on [NodeGoat Google Group](https://groups.google.com/forum/#!forum/nodegoat) 


Troubleshooting  / FAQs
==========================

License
==========
Code licensed under the [Apache License v2.0.](http://www.apache.org/licenses/LICENSE-2.0)
