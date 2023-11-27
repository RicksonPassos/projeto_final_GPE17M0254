create database aplicacao_final;

create table usuarios(
    id serial not null unique primary key,
    nome text, 
    email text unique,
    senha text
);

create table produtos(
    id serial not null unique primary key,
    nome text, 
    descricao text,
    ativo boolean not null default 1,
    id_usuario serial references usuarios(id)
);

create table transacoes(
    id serial not null unique primary key,
    descricao text,
    valor integer,
    data timestamp,
    tipo text,
    id_usuario serial references usuarios(id)
);

