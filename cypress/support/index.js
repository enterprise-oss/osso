import "./commands";

before(() => {
  cy.exec(
    "BASE_URL=http://localhost:9292 RACK_ENV=test SESSION_SECRET=secret bundle exec rake db:migrate"
  );
  cy.exec(
    "BASE_URL=http://localhost:9292 RACK_ENV=test SESSION_SECRET=secret bundle exec rake db:seed:replant"
  );
});
