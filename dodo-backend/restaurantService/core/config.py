from pydantic_settings import BaseSettings, SettingsConfigDict


class KafkaConfig(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra='ignore',
        env_prefix='KAFKA'
    )
    kafka_host: str
    kafka_port: int


def load_kafka_config():
    return KafkaConfig()
