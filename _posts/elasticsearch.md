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
- Logstash


# Basic Architecture
![elastic-arhitecture](/assets/blog/elasticsearch/elastic-arhitecture.jpg)
- Node(s) is 1+ instance of and ElasticSearch, each node as an `id` and a unique `name`
- Node belong to 1+ Clusters
- Data is stored as JSON documents
- Similar objects are grouped together in an `index`. e.g. user's `index` will contain user documents
- `Index` is not actually storing the data, it just keeps track of where the data is stored on each `node`
- A `shard` is was exist on the disk
- When you create an idex you get 1 shard by default, you can configure it so it creates an index with multiple shards that are distributed across nodes, called "sharding"
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
  - *I would avlid this* Install it directly on your machine (make sure you have Java installed)
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








- Query DSL
- Filters vs. Queries
- Scoring




# Preform CRUD opperations 


# URI Search


# Nodejs CRUD


# 
















