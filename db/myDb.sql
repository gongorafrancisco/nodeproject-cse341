CREATE TABLE users (
    user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    user_email   VARCHAR(40) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    company_id INT NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
    UNIQUE (user_email)
);

CREATE TABLE companies (
    company_id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    company_name   VARCHAR(50) NOT NULL,
    company_spcode  VARCHAR(13) NOT NULL,
    UNIQUE (company_name, company_spcode)
);

CREATE TABLE tickets (
    ticket_id   INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    ticket_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ticket_title    TEXT NOT NULL,
    ticket_content  TEXT NOT NULL,
    ticket_closed   BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE comments (
    comment_id  INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id   INT NOT NULL REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    comment_date    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    comment_content TEXT NOT NULL
);

CREATE TABLE files (
    file_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ticket_id   INT NOT NULL REFERENCES tickets(ticket_id) ON DELETE CASCADE,
    file_path   TEXT NOT NULL
);