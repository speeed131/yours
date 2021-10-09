from sqlalchemy import Column, Integer, String, ForeignKey, CHAR, Text, text
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Boolean, Date, DateTime
from sqlalchemy.dialects.mysql import TIMESTAMP as Timestamp


from api.db import Base

# @FIX:リファクタそれぞれのモデルファイルを定義する


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String(255), nullable=False, unique=True)
    email = Column(String(255))
    hashed_password = Column(CHAR(60), nullable=False)
    created_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp on update current_timestamp'))

    # tenant = relationship("Tenant", back_populates="ip_restrictions")


# 多対多のテーブルの作り方  https://docs.sqlalchemy.org/en/14/orm/basic_relationships.html?highlight=many#many-to-many

class Word(Base):
    __tablename__ = "words"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    meaning_japanese = Column(Text)
    meaning_english = Column(Text)
    memo = Column(Text)
    is_rememberd = Column(Boolean, default=False)
    rememberd_at = Column(String(255))
    created_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp on update current_timestamp'))

    # user = relationship("User", back_populates="word")


class Dailies_words(Base):
    __tablename__ = "dailies_words"

    id = Column(Integer, primary_key=True)
    word_id = Column(Integer, ForeignKey("words.id"), nullable=False)
    daily_id = Column(Integer, ForeignKey("dailies.id"), nullable=False)
    created_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp on update current_timestamp'))

    # word = relationship("Word", back_populates="daily_word")
    # daily = relationship("Daily", back_populates="daily_word")


class Daily(Base):
    __tablename__ = "dailies"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(255))
    meaning_japanese = Column(Text)
    meaning_english = Column(Text)
    is_open = Column(Boolean, default=False)
    opened_at = Column(String(255))
    created_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp'))
    updated_at = Column(Timestamp, nullable=False,
                        server_default=text('current_timestamp on update current_timestamp'))

    # user = relationship("User", back_populates="daily")
