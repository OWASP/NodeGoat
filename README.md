# NodeGoat

Being lightweight, fast, and scalable, Node.js is becoming a widely adopted platform for developing web applications. This project provides an environment to learn how OWASP Top 10 security risks apply to web applications developed using Node.js and how to effectively address them.


## How to Install and Run NodeGoat

### Requirements
1. Install [Node.js](http://nodejs.org/) - NodeGoat requires Node v0.10 or above
2. Git command line tools - follow the setup instructions [on GitHub](https://help.github.com/articles/set-up-git) or download [here](http://git-scm.com/downloads)

### Getting a Copy of the Code
Open a command prompt / terminal window and run the command below from the parent directory inside which you would like the NodeGoat code copied.
`git clone https://github.com/OWASP/NodeGoat.git`

### Running Your Copy of the Code
* Install node modules
```sh
cd NodeGoat
npm install 
```
* Create and populate local DB (Pass the desired environment, if not the default "development".)
```
grunt db-reset:development
```
* Update the file `config/env/development.js` to reflect your DB setup.
* Start server, this starts the NodeGoat application at url [http://localhost:4000/](http://localhost:4000/)
```
npm start
```

### Customizing the Default Application Configuration
The default application settings (database url, http port, etc.) can be changed by updating the [config file] (https://github.com/OWASP/NodejsGoat/blob/master/config/env/all.js).


## Contributing
Contributions from community are key to make NodeGoat a high quality comprehensive resource. Lets make NodeGoat awesome together!

**New to git?** You may find these resources helpful:
* [GitHub's git tutorial](http://try.github.io/)
* [git - the simple guide](http://rogerdudler.github.io/git-guide/)
* [git tutorials and workflows](https://www.atlassian.com/git/tutorial)

### Ways to Contribute
Depending on your preference, you can contribute in various ways. Here are tasks planned for [upcoming release](https://github.com/OWASP/NodeGoat/milestones).
To begin, inform team about task you would like to contribute on by opening an issue, sending a PR, or on [Gitter Chat](https://gitter.im/OWASP/NodeGoat)

### What is the Process
1. Assign a task from [project task list](https://github.com/OWASP/NodeGoat/issues?q=is%3Aopen) to yourself.
2. Implement changes in a fork.
3. Once code is ready to commit, run: 
```
grunt precommit
```
This command uses `js-beautifier` to indent the code and verifies these [coding standards](https://github.com/OWASP/NodeGoat/blob/master/.jshintrc) using `jsHint`. Resolve all `jsHint` errors before committing the code.

4. Commit the changes by adding [issue number into a commit message](https://help.github.com/articles/closing-issues-via-commit-messages)
5. Submit a pull request.

### Contributors
Here are the amazing [contributors](https://github.com/OWASP/NodeGoat/graphs/contributors) to the NodeGoat project.


## Report bugs, Feedback, Comments
*  Open a new [issue](https://github.com/OWASP/NodeGoat/issues) or contact team by joining chat at [![Join the chat at https://gitter.im/OWASP/NodeGoat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/OWASP/NodeGoat?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


## License
Code licensed under the [Apache License v2.0.](http://www.apache.org/licenses/LICENSE-2.0)
