# CSNA

```
git clone git@github.com:abdulsattar/csna.git
cd csna
npm install
heroku login
heroku git:remote -a
heroku pg:pull postgresql-trapezoidal-06342 csna --app csna
npm run dev
```

Postgres should be installed and running on port 5432 (default).
There should be a user called postgres with password as postgres. `brew install postgresql` does this automatically for you. On linux, it's a little complicated.

## To Deploy

```
git push heroku master
```
