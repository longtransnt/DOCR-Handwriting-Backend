
#  Upload Annotation API

  API Services Layer for Annotation Application for HANDWRITING RECOGNITION APPLICATION FOR TETANUS TREATMENT

## Acknowledgements
This project module has been developed and belongs to:
 - [RMIT University Vietnam SGS](https://www.rmit.edu.vn/)
 - [Oxford University Clinical Research Unit](https://www.oucru.org/)


## Authors

- [@longtransnt](https://github.com/longtransnt)
- [@chrisidenbui](https://github.com/chrisidenbui)
- [@julliannah](https://github.com/julliannah)
- [@s3681447](https://github.com/s3681447)


## Built With

This project has been built with:

[![Node JS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()

[![JavaScript](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)]()

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)]()

[![Amazon](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)]()

[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)]()


##  Prerequisites

To run this app you need basic setups:

- GitHub Repository
- Amazon RDS (Amazon Relational Database Services)
- Amazon CodePipeline 
- Amazon S3 (Amazon Simple Storage Service)


## Environment Variables

To run this project, you will need to add the following environment variables to your ./config/config.json file:

`username: postgres`

`password: [PASSWORD]`

`database: postgres`

`host: [AMAZON RDS ENDPOINT]`

`port: 5432`

`dialect: postgres`

Maybe need to change some constant variables in ./routes/api/ files

`const S3_BUCKET = [S3 BUCKET NAME];`
## API Reference

#### Get all uploads

```http
  GET /api/uploads
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | Page number for Pagination |
| `size` | `string` | Page size for Pagination |
| `title` | `string` | Page title |
| `limit` | `string` | Pagination limit |
| `offset` | `string` | Pagination offset |

#### Get all unannotated uploads

```http
  GET /api/uploads/unannotated
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `string` | Page number for Pagination |
| `size` | `string` | Page size for Pagination |
| `title` | `string` | Page title |
| `limit` | `string` | Pagination limit |
| `offset` | `string` | Pagination offset |

#### Get image upload

```http
  GET /api/uploads/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of image to fetch |


#### Get all image upload by original image id

```http
  GET /api/uploads/originals/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of original image to fetch |

#### Post uploads

```http
  POST /api/uploads
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `image` | **Required**. Image to upload to S3 bucket |


#### Get all coordinates

```http
  GET /api/coordinate
```

#### Get coordinates by image id

```http
  GET /api/coordinate/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of image to fetch |


#### Post coordinates data

```http
  POST /api/coordinate/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `json file`      | `json` | **Required**. json file contains: 
| | |image_name, original_image_name, max_x, max_y, min_x, min_y |

#### Post uploads

```http
  POST /api/uploads
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `image` | **Required**. Image to upload to S3 bucket |


#### Get all originals

```http
  GET /api/originals
```

#### Get originals by image id

```http
  GET /api/originals/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of image to fetch |


#### Post originals image

```http
  POST /api/originals/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `image`      | `image` | **Required**. Image to upload to S3 bucket |

