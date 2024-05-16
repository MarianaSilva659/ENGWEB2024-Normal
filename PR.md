# TPC4
## 2024-05-16

## Autor

- A100702
- Mariana Antunes Silva

## Exercício 1

### 1.2 Queries


. Quantos registos estão na base de dados;

```
db.contratos.countDocuments()

```


. Quantos registos de contratos têm o tipo de procedimento com valor "Ajuste Direto Regime Geral"?

```
db.contratos.countDocuments({"tipoprocedimento": "Ajuste Direto Regime Geral"})
```

. Qual a lista de entidades comunicantes (ordenada alfabeticamente e sem repetições)?

```
db.contratos.distinct("entidade_comunicante").sort()

```

. Qual a distribuição de contratos por tipo de procedimento (quantos contratos tem cada tipo de
procedimento)?


```
db.contratos.aggregate([
  {
    $group: {
      _id: "$tipo_procedimento",
      total_contratos: { $sum: 1 }
    }
  }
]);
```


. Qual o montante global por entidade comunicante (somatório dos contratos associados a uma
entidade)?

```
db.contratos.aggregate([
  {
    $lookup: {
      from: "entidades_comunicantes",
      localField: "entidade_id",
      foreignField: "_id", 
      as: "entidade"
    }
  },
  {
    $unwind: "$entidade"
  },
  {
    $group: {
      _id: "$entidade.nome", 
      montanteTotal: { $sum: "$valor" }
    }
  }
])
```

## Desenvolvimento - Ferramentas e db
Utilizei node.js, express e mongoDB para o desenvolvimento das duas aplicações.

Utilizei ficheiro contratos2024.cvs, este ficheiro foi convertido para json e e foram feitas algumas alterações nomeadamente o idcontrato passou a ser _id.

Depois de ter o ficheiro no formato json, coloquei no mondodb com os seguintes comandos:
```
 docker cp contratos.json mongoEW:/tmp
 docker exec mongoEW mongoimport -d contratos -c contratos /tmp/contratos.json --jsonArray 
 ```

 Depois foi realizado o desenvolvimento dos dos exercícios.


# Para correr o trabalho em ambos os exercíios basta fazer:

- npm i
- npm start