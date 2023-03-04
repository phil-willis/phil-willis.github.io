---
title: 'elasticsearch'
excerpt: ''
coverImage: '/assets/covers/elasticsearch.jpg'
ogImage:
  url: '/assets/covers/elasticsearch.jpg'
---


# What is ElasticSearch
- Initially released in 2010, Elasticsearch (ES) which is based on Apache Lucene
- It's a NoSQL Database, which means you store data in an unstructed way
- It's open source, & build with Java
- Most of the time you don't just use Elasticsearch by itself, you use the ELK Stack (Elasticsearch, Logstash and Kibana)
- It's Fast, relevant data


## ElasticSearch stack
- ElastsicSearch: Store, search, &  analyze data
- Kibana: a web interface to searc, view, interact
- Logstash: ingest data


# Basic Architecture
![elastic-arhitecture](/assets/blog/elasticsearch/elastic-arhitecture.jpg)
- A `Cluster` can be >=1 `nodes` (nodes are distributed across multiple machines, each node as an `id` and a unique `name`) and work together to accomplish a task
- Data is stored a JSON objects
- Data is stored as JSON documents
- Similar objects are grouped together in an `index`. e.g. user's `index` will contain user documents
- `Index` is not actually storing the data, it just keeps track of where the data is stored on each `node`
- A `shard` is was exist on the disk
- When you create an index you get 1 shard by default, you can configure it so it creates an index with multiple shards that are distributed across nodes, called "sharding"
- So data is stored in a shard, and it's capacity is dependent on the size of the node
- You can add more/less shards as the data changes, you can horizontally scale to adapt to increasing data
- You also run search queries on shards
- **The power of multiple shards** is that you can query in parallel multiple shards to get your answer faster. 
- Example:
  - 1 shard with 50k might take ~10 seconds
    ![50k-1-shard.](/assets/blog/elasticsearch/50k-1-shard.jpg)
  - Same query with 10 shards with 5k each should take 1 second!!
    ![50k-10-shards](/assets/blog/elasticsearch/50k-10-shards.jpg)
- You can run a query on multiple shards to get the answer faster
- You can also replate shards on different nodes for redunancy (Primary Shard & Replica Shards)



# Installing ES
- There's multiple options to work with ES
  - *I would avoid this* Install it directly on your machine (make sure you have Java installed)
  - Using Docker or Docker Compose
  - Cloud service

## Via Docker
- He's a simple DockerCompose file `docker-compose.yml`
  ```shell
  version: '3.7'
  services:

    # Elasticsearch Docker Images: https://www.docker.elastic.co/
    elasticsearch:
      image: docker.elastic.co/elasticsearch/elasticsearch:7.4.0
      container_name: elasticsearch
      environment:
        - xpack.security.enabled=false
        - discovery.type=single-node
      ulimits:
        memlock:
          soft: -1
          hard: -1
        nofile:
          soft: 65536
          hard: 65536
      cap_add:
        - IPC_LOCK
      volumes:
        - elasticsearch-data:/usr/share/elasticsearch/data
      ports:
        - 9200:9200
        - 9300:9300

    kibana:
      container_name: kibana
      image: docker.elastic.co/kibana/kibana:7.4.0
      environment:
        - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
      ports:
        - 5601:5601
      depends_on:
        - elasticsearch

  volumes:
    elasticsearch-data:
      driver: local
  ```
- Run it
  ```shell
  # Run it in the background
  $ docker compose up -d

  # keep the shell open
  $ docker compose -f docker-compose.yml up 

  # Stop the containers
  $ docker compose down

  # Stop and remove the volume
  $ docker compose down -v
  ```


# Ways to work with the Elasticsearch Database

## Curl


## Http


## node.js library


## Kibana Console
- [localhost 5601](http://localhost:5601/app/kibana)
- On the left-side bar click on the `Dev Tools` the wrench icon
  ![devtools](/assets/blog/elasticsearch/devtools.jpg)



### Get information of the cluster

- Getting information about your ElasticSearch cluster/nodes you can use some keywords that start with `_`
  ```http
  GET _cluster/health
  GET _nodes/stats
  ```
- Creating an index is really easy all you have to do is `PUT <INDEX-NAME>`
  ```http
  PUT favorite_candy
  ```
- If the index was create properly you should get:
  ```json
  {
    "acknowledged" : true,
    "shards_acknowledged" : true,
    "index" : "favorite_candy"
  }
  ```
- When creating a document you can use both `POST` & `PUT`
- Use `POST` if you want ElasticSeach to autogenerate an id for your document
  ```http
  POST <INDEX_NAME>/_doc
  {
    "field": "value"
  }
  ```
- Return value something like
  ```json
  {
    "_index" : "favorite_candy",
    "_type" : "_doc",
    "_id" : "Cm1uXYYBeJQqzgDkslP7",
    "_version" : 1,
    "result" : "created",
    "_shards" : {
      "total" : 2,
      "successful" : 1,
      "failed" : 0
    },
    "_seq_no" : 0,
    "_primary_term" : 1
  }
  ```
- Use `PUT` if you want to define the id for the document
  ```http
  PUT <INDEX_NAME>/_doc/1
  {
    "field": "value"
  }
  ```







GET quotes/_search
{
  "query": {
    "match_all": {}
  }
}
```










# Working with the Elasticsearch via CRUD







# DSL (Domain Specific Language)
DSL stands for Domain Specific Language. In Elasticsearch, the DSL refers to a JSON-based query language that is used to interact with Elasticsearch. 
- The DSL provides a way to define and execute various types of queries and aggregations against an Elasticsearch index. 
- It is a powerful tool that allows you to filter, sort, and manipulate large amounts of data with a high degree of flexibility and precision. 
- The DSL includes a wide range of query types, including full-text search, term-level queries, geo-spatial queries, and more. It also allows you to perform complex aggregations, such as grouping and statistical analysis, to extract meaningful insights from your data.




- Query DSL
- Filters vs. Queries
- Scoring




# Preform CRUD opperations 


# URI Search


# Nodejs CRUD


# 
















