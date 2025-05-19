import {ApiProperty} from "@nestjs/swagger"

export class UserDeviceFormDto {
    @ApiProperty({
        type: "string",
        nullable: true,
    })
    deviceVendor: string | null

    @ApiProperty({
        type: "string",
        nullable: false,
    })
    deviceModel: string | null

    @ApiProperty({
        type: "string",
        nullable: false,
    })
    deviceOS: string | null

    @ApiProperty({
        type: "string",
        nullable: true,
    })
    deviceVersion: string | null

    @ApiProperty({
        type: "string",
        nullable: true,
    })
    appType: string | null

    @ApiProperty({
        type: "string",
        nullable: false,
    })
    appVersion: string

    @ApiProperty({
        type: "string",
        nullable: false,
    })
    fcmToken: string

    @ApiProperty({
        type: "string",
        format: "date-time",
        nullable: true,
    })
    created: Date | null

    @ApiProperty({
        type: "string",
        format: "date-time",
        nullable: true,
    })
    lastModified: Date | null
}
