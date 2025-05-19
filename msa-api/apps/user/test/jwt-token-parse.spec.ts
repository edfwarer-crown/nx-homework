import {JwtService} from "@nestjs/jwt"

describe("JWT Token Parser", () => {
    let jwtService: JwtService

    beforeAll(() => {
        jwtService = new JwtService({
            secret: "",
        })
    })

    it("Should be parse", () => {
        const token = "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJob2R1ZHUuZHVkdSIsImRldGFpbCI6eyJ1c2VySWQiOjE1LCJ1c2VybmFtZSI6ImhvZHVkdS5kdWR1IiwiZW1haWwiOiJ6b2UuamFuZ0BwYXdkbHkuY29tIiwicm9sZSI6eyJpZCI6Niwicm9sZVRpdGxlIjoiTm9ybWFsIHVzZXIifX0sImlhdCI6MTczNzU1Njc3NCwiZXhwIjoxNzM3NjQzMTc0fQ.hP8L8uaz5OUaCkCaH-1GYuHB3eIa7w0pzOv-_0hVQJKqXqv58zbhJkt3ZfPZ1YmnqssrqQwR3LZZdnhitfhbww"

        const decoded = jwtService.decode(token)

        console.log(decoded)
    })
})
