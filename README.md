# PARROT

<p align="center">
<a href="https://insomnia.rest/run/?label=Parrot&uri=https%3A%2F%2Fraw.githubusercontent.com%2FNeryVictor%2Fparrot%2Fmain%2F.docs%2FInsomnia_2022-09-09.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

<p align="center"> 
<a href= "#-Project">Project</a> &#160; |&#160;
<a href= "#-Client">Client</a>  &#160; |&#160;
<a href= "#-Authors">Authors</a>  &#160; |&#160;
<a href= "#-Features Created">Features Created</a>  &#160; |&#160;
<a href= "#-Technology and Dependency used">Technology and Dependency used</a> &#160; |&#160;
<a href= "#-How to use">How to use</a> &#160; |&#160;
<a href= "#-Optional Features ">Optional Features </a> &#160; |&#160;
<a href= "#-How to contribute">How to contribute</a>
</p>

🖥️ Project
===============
Social network API from Gama Academy's XP43.

 
✨ Client
===============

Parrot is a white label system for condominiums, to encourage interaction among the residents.<br>
The platform allows users to make publications for the entire community.

![Parrot]

🏗️ Back-end authors
=================
- [x] Fabiana Boniolo de Oliveira
- [x] Pedro Fontes
- [x] Victor César Nery da Paixão 

🏗️ Front-end authors
=================

- [x] Bruno Andrade Lima de Araújo
- [x] Pedro Arruda 

Repository: https://github.com/Brunoalaraujo/HandsOnParrot.git

📝 Features Created
=====================
* Login (JWT Authentication)
* Users CRUD
* Posts CRUD


🚀 Techs
=================

<table>
<tr>
<td>node</td>
<td>typeorm</td>
<td>typeorm-extension</td>
<td>express</td>
<td>mysql</td>
<td>bcrypt</td>
<td>jest</td>
<td>jsonwebtoken</td>
<td>supertest</td>
<td>reflect-metadata</td>
</tr>
</table>

## Local Project

To run this project locally, you'll need Git, Node and MySQL installed on your computer. 

After cloning project, remember to insert your local database credentials into /.env.

```bash
# Clone this repository
$ git clone https://github.com/pedrofnts/parrot.git

# Go into the repository
$ cd parrot

# Install dependencies
$ yarn install

# Create database
$ yarn db:create

# Generate migrations
$ yarn migration:generate

# Run migrations
$ yarn migration:run

# Add seeds
$ yarn seed

# Run server
$ yarn run dev


# running on port 3000


📇 body requisitions
=================

* create user 
```
{ "name": string, "email": string, "password": string, "apartment": number }
```
* create post 
```
{ "content": string }
```


Made with 💚 by <br>

🔹 Fabiana Boniolo de Oliveira 👋 [Get in touch](https://github.com/Fabi-Boniolo)<br>
🔹 Pedro Fontes 👋 [Get in touch](https://github.com/pedrofnts)<br>
🔹 Victor Nery 👋 [Get in touch](https://www.linkedin.com/in/neryvictor/)<br>

🔸 Bruno Andrade Lima de Araújo 👋 [Get in touch](https://github.com/Brunoalaraujo)<br>
🔸 Pedro Arruda 👋 [Get in touch](https://github.com/PedroRArruda)<br>
