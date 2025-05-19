import {ApiProperty, PickType} from "@nestjs/swagger"

export class CreateAddressFormDto {
    @ApiProperty({
        type: "string",
        required: false,
        nullable: true,
        example: Date.now() + "",
    })
    title?: string | null

    @ApiProperty({
        type: "string",
    })
    contact: string

    @ApiProperty({
        type: "string",
    })
    postal: string

    @ApiProperty({
        description: "기본 배송지 여부",
    })
    isDefault: boolean

    @ApiProperty({
        description: "주소",
    })
    address1: string

    @ApiProperty({
        description: "세부 주소",
        nullable: true,
    })
    address2: string | null

    @ApiProperty({
        type: "number",
        format: "double",
        description: "경도",
        required: false,
        nullable: true,
    })
    longitude?: number

    @ApiProperty({
        type: "number",
        format: "double",
        description: "위도",
        required: false,
        nullable: true,
    })
    latitude?: number

    constructor(partial?: Partial<CreateAddressFormDto>) {
        Object.assign(this, partial)
    }
}

export class UpdateAddressFormDto extends CreateAddressFormDto {
    id: number
}

export class CollectAddressDto extends PickType(CreateAddressFormDto, [
    "postal",
    "address1",
    "address2",
] as const) {}
