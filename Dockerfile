FROM ruby:2.6.4
RUN gem update --system

RUN apt-get update -qq && apt-get install -y build-essential

ENV APP_HOME /app
ENV BUNDLE_WITHOUT development,test

RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME

RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["./docker-entrypoint.sh"]

EXPOSE 4567

CMD ["bundle", "exec", "rackup", "--host", "0.0.0.0", "-p", "4567"]