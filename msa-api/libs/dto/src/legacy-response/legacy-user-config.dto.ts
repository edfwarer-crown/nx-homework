import {ApiProperty} from "@nestjs/swagger"

export class LegacyUserConfigDto {
    @ApiProperty({description: "아이디"})
    id: number

    @ApiProperty({description: "유저 아이디"})
    userId: number

    @ApiProperty({description: "업체 아이디"})
    groupId: number

    @ApiProperty({description: "파트너 앱 시스템 알림 수신 여부"})
    notifPartnerSystem: boolean

    @ApiProperty({description: "파트너 앱 서비스 알림 수신 여부"})
    notifPartnerService: boolean

    @ApiProperty({description: "파트너 앱 광고 수신 여부"})
    notifPartnerCustomerCenter: boolean

    @ApiProperty({description: "파트너 앱 광고 알림 수신 여부"})
    notifPartnerAdvertisement: boolean

    @ApiProperty({description: "유저 앱 계정 알림 수신 여부"})
    notifUserAccount: boolean

    @ApiProperty({description: "유저 앱 예약 알림 수신 여부"})
    notifUserReservation: boolean

    @ApiProperty({description: "유저 앱 케어 알림 수신 여부"})
    notifUserCare: boolean

    @ApiProperty({description: "유저 앱 마케팅 알림 수신 여부"})
    notifUserMarketing: boolean

    @ApiProperty({description: "생성 일자"})
    created: number

    @ApiProperty({description: "수정 일자"})
    lastModified: number
}
