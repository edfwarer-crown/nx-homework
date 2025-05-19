export const ClientProxyCmds = {
    user: {
        get: {cmd: "user.getOne"},
        exists: {cmd: "user.exists"},
        auth: {cmd: "auth.validateUser"},
        changePassword: {cmd: "user.change-password"},
    },
    attachments: {
        create: {cmd: "create.images"},
    },
    products: {
        exists: {cmd: "product.exists"},
    },
}
