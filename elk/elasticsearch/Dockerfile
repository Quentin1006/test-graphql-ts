FROM elasticsearch:7.10.1

COPY --chown=elasticsearch:elasticsearch elasticsearch.config.yml /usr/share/elasticsearch/config/

CMD ["elasticsearch", "-Elogger.level=INFO"]
