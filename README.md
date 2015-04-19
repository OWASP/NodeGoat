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

```sh
git clone https://github.com/OWASP/NodeGoat.git
```
### Running Your Copy of the Code

0. Install node modules

  ```sh
  cd NodeGoat
  npm install
  ```

0. Create and populate local DB 

  0. Connect to [mongod](http://docs.mongodb.org/manual/reference/program/mongod/#bin.mongod)
  0. From a system prompt, start [mongo](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo) by issuing the [mongo](http://docs.mongodb.org/manual/reference/program/mongo/#bin.mongo) command
  0. Run the "nodegoat_db_reset.js" Mongo shell script to create your "nodegoat" database
  ```sh
  mongo localhost:27017 nodegoat_db_reset.js
  ```
  0. Add an entry for DB path in `config/env/development.js` as
  ```js
  var devConfig = {
    db: "mongodb://localhost/nodegoat" // path to local mongo db
    // any other dev specific entries here
  };
  ```

0. Start server

  ```sh
  grunt run
  ```

  This starts the NodeGoat application at url [http://localhost:5000/](http://localhost:5000/)

### Customizing the Default Application Configuration

The default application settings (database url, http port, etc.) can be changed by updating the [config file] (https://github.com/OWASP/NodejsGoat/blob/master/config/env/all.js).


Contributing
=================================

Contributions from community are key to make NodeGoat a high quality comprehensive resource. Lets make NodeGoat awesome together!


**New to git?** You may find these resources helpful:
* [GitHub's git tutorial](http://try.github.io/)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
* [git tutorials and workflows](https://www.atlassian.com/git/tutorial)

### Ways to Contribute

Depending on your preference, you can contribute in various ways. Here are tasks planned for [upcoming release](https://github.com/OWASP/NodeGoat/issues/milestones).
To begin, inform team about task you would like to contribute on, or send any other suggestions you may have using [NodeGoat Google Group](https://groups.google.com/forum/#!forum/nodegoat).

### What is the Process
1. Assign a task from [project task list](https://github.com/OWASP/NodeGoat/issues?milestone=2&state=open) to yourself.
2. Implement the changes in a fork.
3. Once code is ready to commit, run command:
  ```
  grunt precommit
  ```
  This command indents code using `js-beautifier` and shows any `jsHint` errors. These [coding conventions](https://github.com/OWASP/NodeGoat/blob/master/.jshintrc) are checked using `jsHint`. Resolve all `jsHint` errors before committing the code.

4. Commit the changes by adding [issue number into a commit message](https://help.github.com/articles/closing-issues-via-commit-messages)
5. Submit a pull request

### Contributors
Here are the amazing [contributors](https://github.com/OWASP/NodeGoat/graphs/contributors) to the NodeGoat project.


Report bugs, Feedback, Comments
====================================
*  Contact team by posting a message on [NodeGoat Google Group](https://groups.google.com/forum/#!forum/nodegoat) 


License
==========
Code licensed under the [Apache License v2.0.](http://www.apache.org/licenses/LICENSE-2.0)
