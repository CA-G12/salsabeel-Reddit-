Begin ;

Drop TABLE IF EXISTS users, products, bags CASCADE; 

 CREATE TABLE users(
    id SERIAL PRIMARY KEY ,
    userName varchar(100) not null ,
    hashPassword varchar(100) not null ,
    type varchar(100) not null  DEFAULT 'buyer',
    email varchar(100) not null UNIQUE 
 );

 CREATE TABLE products(
    id SERIAL PRIMARY KEY ,
    productName varchar(100) not null ,
    saller_id int not null ,
    Descprition text not null, 
    productImg text not null ,
    price int not null ,
    pickingDate date,
    rate int not null ,
    CONSTRAINT fk_saller_id FOREIGN KEY (saller_id) REFERENCES users(id)
);
 CREATE TABLE bags(
    id SERIAL PRIMARY KEY ,
    buyerId int not null ,
    productId int not null,
    CONSTRAINT fk_productId FOREIGN KEY (productId) REFERENCES products(id),
    CONSTRAINT fk_buyerId FOREIGN KEY (buyerId) REFERENCES users(id)
    );

INSERT INTO users ( userName ,hashPassword ,type , email) values ('salsabeel', '$2a$12$U5zJQK4u/GsHgAiYdKLHV.oq/730aZgIOEYTXBBP3yXwVMzLI9KtK'
,'buyer','omarsalsabeel65@gmail.com');
INSERT INTO users ( userName ,hashPassword ,type , email) values ('salsabeel', '$2a$12$U5zJQK4u/GsHgAiYdKLHV.oq/730aZgIOEYTXBBP3yXwVMzLI9KtK'
,'saller','omar65@gmail.com');

INSERT INTO products (productName, saller_id, Descprition, productImg, rate, pickingDate ,price )values ('white Rose',1,'Form france','https://s3-alpha-sig.figma.com/img/067b/7875/b9ad6fac0c200f2d8609ccc73eb5e6b0?Expires=1662940800&Signature=OmMQKTw7nwQcXRubfL0meeQP~VoHqWDr7-vM4~Ljt4GzfJHdzk5lGkaSvUrPA7GBK-oWFNZ48LtSTRmUFTFqH3qdTodSwIPiY2I4I1t59lCTRYAgEn-Ts8vb7C~hsZfW1Auayzs2vFMVWsWgBazgT8oQ2HqcMqRnLlRuoLqzyaeYRdtz1demQJc1pR3J3Pk-HPZBQUgylUamP2Fj4FwDlrF~TDx9EqdGf1jIchwX1KYfhleCBiUvrNTYj7L3JEi6RJAx8oLcciazvDAyehvxnl0qKpACqGjocfmGW-NPPLlR6wkO0WkAU4KFpWziB3LGGEPqoJSx65-im7NJer4pQw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
 15 , '2022-9-2', 25);
INSERT INTO products (productName, saller_id, Descprition, productImg, rate, pickingDate ,price )values ('Pink Rose',1,'Form france','https://s3-alpha-sig.figma.com/img/3847/e361/d25d5f2932bd7b7ac9cd6fa57b95b9f8?Expires=1662940800&Signature=MoLr0pFI5Frt4LtRV8FHRVVDzmTALECL3Kl6RvlbkZOAtb2RG38YJdHF~M4JxPvJPRuJXjJaU2~HnNCFUlHZMypE~t3~lGfzIm8X8VSQma0GasJa9OzL1JTJBJ8Xjr9fs61j7yYwf6QuqngToQo4FNScnb8h1WPYRwQfhW8QzKztg86uvU9rG2Re0f0cQAX2NdDptp9pWOHw-NteBCk1daWMO-Puqqce56gzhrOqCyTmQmwTtJYPO0Mc0XfExD27nUgjp~lx5jNkF4otp9fziup2h4kEpex~nZA4cMCQAOOqkYfK1upW6vpvD7wxtPFtBdbkBt9KSwhphk1hvUpWDw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
 10 , '2022-9-1', 35);
 INSERT INTO products (productName, saller_id, Descprition, productImg, rate, pickingDate ,price )values ('collection of Roses',1,'Form france','https://s3-alpha-sig.figma.com/img/c563/33d6/a031d46327223a179068bd13f920a8f3?Expires=1662940800&Signature=A1z4LpJn10ieNM81v9CIU5Mv1upg98ySLhmer-UReSK4UIJJEuduisDq8OBCPiatUfl8xA5snlMSnq5-5-k3z-Ynfq4uu~Vn7zhnCbdvrxhw58ZsbXge2oeiIllpr9xI80Srj8v0wB2AWEXPbXzhxggCvAAHTzP7ormSo74wGUyQa0FocLHvQLQh1Cur-tv5PYnWBHkUZQo9Fg5E2qXgIrgeTTewACWQC0Uxk9S017Kv9LDHaROZ9cF1pP0AP4d~Q3B98A5iQHC1rdhdibxzviXfIy~ncVzqxcDwxU~6IY09dCyn1w4IjDo~iWV~yVllsOGaqEt7-4nENUjH9-XFOA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
 45 , '2022-9-9', 90);

 INSERT INTO bags (buyerId, productId) values ( 2,3);

commit;
