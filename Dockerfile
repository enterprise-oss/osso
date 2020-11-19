FROM https://122562668695.dkr.ecr.us-east-1.amazonaws.com/nodejs:latest as builder
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
RUN yarn build

FROM https://122562668695.dkr.ecr.us-east-1.amazonaws.com/ruby:latest
RUN gem update --system

RUN apt-get update -qq && apt-get install -y build-essential
RUN apt-get install -y libpq-dev

ENV APP_HOME /app
ENV BUNDLE_WITHOUT development,test

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME

COPY --from=builder /usr/src/app/public $APP_HOME/public

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 4567

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]