# Problem 3 : Local development

Our developers are building a (micro)-service, that we will deploy on our `kubernetes` cluster.
For local development, we want the enviroment to be reproducable and containerized too.


## Starting point

You may assume that every developer :

- has a working operating system.
- may or may not have Docker (for Mac) installed.
- should not install anything else than docker.


## Requirements

You can have a look in the [`project`](./problem-3) directory of the example project, to see how the project is set up:

- a `php` backend in the [`server`](./problem-3/server) directory
- a `javascript` frontend (in the [`client`](./problem-3/client) directory), which needs `nodejs` and `npm` during development, but can be served statically on production

Next to that, the lead developer also ask for :

- a webserver, to route all trafic for the api (`/api`) to the backend
- the `php-imagick` extension
- `composer` (in development, but later also in build environments)
- `mysql` 5.6
- `redis`

Some nice to haves :

- route all trafic to `https` (definately on production)
- the ability to run `phpunit` tests inside a container
- the ability to debug with `xdebug` inside the backend container


## Deliverables

- a `docker-compose.yml` file for the local development environment
- the necessary `Dockerfile`s for the images you needed to create yourself
- documentation on how to run the project locally
- if you implemented nice to haves: some documentation about it
- a list of possible improvements to the application regarding containerization for the lead developer 

---

_By the way, have you checked the general guidelines for our coding test? You cand find them [here](./README.md)_
