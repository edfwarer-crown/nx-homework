import {ApiProperty} from "@nestjs/swagger"

export class ProductCategoryDto {
    @ApiProperty({
        description: "",
        required: false,
    })
    parentCode?: string

    @ApiProperty({
        description: "",
    })
    code: string

    @ApiProperty({
        description: "",
    })
    name: string

    @ApiProperty({
        description: "하위 카테고리 있음 여부",
    })
    hasChildren: boolean

    @ApiProperty({
        description: "정렬 순서",
    })
    sortOrder: number

    @ApiProperty({
        type: () => ProductCategoryDto,
        isArray: true,
        example: [
            {
                parentCode: "string",
                code: "string",
                name: "string",
                children: [],
            },
        ],
    })
    children?: ProductCategoryDto[]
}

// export class ChildrenProductCategoryDto extends ProductCategoryDto {}
