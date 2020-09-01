import "./commands";

before(() => {
  cy.exec("RACK_ENV=test bundle exec rake db:migrate");
  cy.exec("RACK_ENV=test bundle exec rake db:seed:replant");
});
