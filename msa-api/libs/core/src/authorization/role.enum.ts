export enum RoleEnum {
    Root = "ROLE_SYSADMIN",
    Admin = "ROLE_ADMIN",
    PartnerOwner = "ROLE_OWNER",
    PartnerMaster = "ROLE_PARTNER_MASTER",
    PartnerManager = "ROLE_PARTNER_MANAGER",
    Partner = "ROLE_PARTNER",
    Vendor = "ROLE_VENDOR",
    User = "ROLE_USER",
    External = "ROLE_EXTERNAL",
}

export const PartnerRoles: RoleEnum[] = [
    RoleEnum.PartnerOwner,
    RoleEnum.PartnerMaster,
    RoleEnum.PartnerManager,
    RoleEnum.Partner,
]

export const VendorRoles: RoleEnum[] = [RoleEnum.Vendor]
