FROM elasticsearch:7.10.1

USER root
COPY --chown=elasticsearch:elasticsearch elasticsearch.config.yml /usr/share/elasticsearch/config/

USER elasticsearch
CMD ["elasticsearch", "-Elogger.level=INFO"]
