SELECT 
	product.id AS product_id,
	product.name AS product_name,
	product.code AS product_code,
	product.product_type_id AS product_product_type_id,
	product.star_point AS product_star_point,
	product.description AS product_description, 
	product.slug AS product_slug, 
	product.default_version_id AS product_default_version_id,
	product.brand_id AS product_brand_id,
	product.created_at AS product_created_at,
	product.updated_at AS product_updated_at, 
	product.deleted_at AS product_deleted_at,
	defaultProductVersion.id AS defaultProductVersion_id,
	defaultProductVersion.name AS defaultProductVersion_name,
	defaultProductVersion.product_id AS defaultProductVersion_product_id,
	defaultProductVersion.code AS defaultProductVersion_code,
	defaultProductVersion.price AS defaultProductVersion_price,
	defaultProductVersion.description AS defaultProductVersion_description,
	defaultProductVersion.image_links AS defaultProductVersion_image_links, 
	defaultProductVersion.default_image AS defaultProductVersion_default_image,
	defaultProductVersion.count_in_stock AS defaultProductVersion_count_in_stock, 
	defaultProductVersion.created_at AS defaultProductVersion_created_at, 
	defaultProductVersion.updated_at AS defaultProductVersion_updated_at, 
	defaultProductVersion.deleted_at AS defaultProductVersion_deleted_at,
  productVersions.id AS productVersions_id, productVersions.name AS productVersions_name,
  productVersions.product_id AS productVersions_product_id,
	productVersions.code AS productVersions_code,
	productVersions.price AS productVersions_price,
	productVersions.description AS productVersions_description,
	productVersions.image_links AS productVersions_image_links, 
	productVersions.default_image AS productVersions_default_image,
	productVersions.count_in_stock AS productVersions_count_in_stock, 
	productVersions.created_at AS productVersions_created_at, 
	productVersions.updated_at AS productVersions_updated_at, 
	productVersions.deleted_at AS productVersions_deleted_at,
	brand.id AS brand_id, 
	brand.name AS brand_name, 
	brand.type AS brand_type, 
	brand.slug AS brand_slug, 
	brand.created_at AS brand_created_at,
	brand.updated_at AS brand_updated_at, 
	brand.deleted_at AS brand_deleted_at,
	productType.id AS productType_id, 
	productType.name AS productType_name,
	productType.code AS productType_code, 
	productType.created_at AS productType_created_at,
	productType.updated_at AS productType_updated_at, 
	productType.deleted_at AS productType_deleted_at, 
	properties.id AS properties_id, 
	properties.name AS properties_name, 
	properties.created_at AS properties_created_at,
	properties.updated_at AS properties_updated_at,
	properties.deleted_at AS properties_deleted_at, 
	propertyValues.id AS propertyValues_id,
	propertyValues.name AS propertyValues_name,
	propertyValues.property_id AS propertyValues_property_id,
	propertyValues.created_at AS propertyValues_created_at,
	propertyValues.updated_at AS propertyValues_updated_at,
	propertyValues.deleted_at AS propertyValues_deleted_at
FROM products product
LEFT JOIN product_versions defaultProductVersion
ON defaultProductVersion.id=product.default_version_id 
LEFT JOIN product_versions productVersions
ON productVersions.product_id=product.id
LEFT JOIN brands brand 
ON brand.id=product.brand_id
LEFT JOIN product_types productType 
ON productType.id=product.product_type_id 
LEFT JOIN product_version_properties productVersions_properties
ON productVersions_properties.product_version_id=productVersions.id 
LEFT JOIN properties properties 
ON properties.id=productVersions_properties.property_id 
LEFT JOIN property_values propertyValues
ON propertyValues.property_id=properties.id 
	