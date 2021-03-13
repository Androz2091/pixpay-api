const fetch = require('node-fetch')

const graphQL = (domain, token, payload) => {
    return new Promise((resolve) => {
        fetch(`${domain}/graphql`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            method: 'POST',
            body: JSON.stringify(payload)
        }).then((res) => {
            res.json().then((data) => {
                resolve(data)
            })
        })
    })
}

module.exports.graphQL = graphQL

module.exports.loginOrRegister = (phoneNumber) => {
    return new Promise((resolve) => {
        fetch('https://prod-auth.pixpay.app/auth/check', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
                login: phoneNumber
            })
        }).then((res) => {
            res.json().then((data) => {
                resolve(data)
            })
        })
    })
}

module.exports.login = (phoneNumber, code) => {
    return new Promise((resolve) => {
        fetch('https://prod-auth.pixpay.app/auth/token', {
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            method: 'POST',
            body: JSON.stringify({
                login: phoneNumber,
                password: code
            })
        }).then((res) => {
            res.json().then((data) => {
                resolve(data)
            })
        })
    })
}

module.exports.fetchBalance = (domain, token) => {
    return graphQL(domain, token, {
        operationName: null,
        variables: {},
        query: `
            query getKycSummary {
                __typename
                getKycSummary {
                    __typename
                    maxPaymentsOnLast30Days
                    maxPaymentsOnLastYear
                    maxAccountBalance
                    slidingPayoutMonthly
                    slidingPayoutYearly
                    userBalance
                    kycLevel
                    verified
                }
            }
        `
    }).then((data) => data.data.getKycSummary)
}

module.exports.fetchUser = (domain, token) => {
    return graphQL(domain, token, {
        operationName: null,
        variables: {
            deviceId: Math.random().toString(36).slice(2, 20),
            deviceUuid: Math.random().toString(36).slice(2, 20)
        },
        query: `
            query MeQuery($deviceId: String!, $deviceUuid: String) {
                __typename
                me(deviceId: $deviceId, deviceUuid: $deviceUuid) {
                __typename
                id
                login
                email
                device {
                    __typename
                    id
                    pushToken
                    pushDesactivatedInSystem
                }
                isProspect
                isUnregistered
                pendingRegistrationId
                processingOrderId
                pushActivated
                parent {
                    __typename
                    id
                    firstname
                    lastname
                    email
                    phone
                    birthdate
                    civility
                    mainWalletId
                    address
                    addressComplement
                    city
                    zipcode
                    country
                    countryCode
                    blocked
                    verified
                    placeOfBirth
                    countryOfBirth
                    countryOfBirthCode
                    blockedDate
                    blockedStatus
                    subscriptionStatus
                    terminated
                    updatedDate
                    createdDate
                }
                parentUser {
                    __typename
                    id
                    applicationUserId
                    isMainUser
                    phone
                    firstname
                    lastname
                    email
                    civility
                    birthdate
                    avatarId
                    autoTopupEnabled
                    isSubscriptionFinished
                    picture
                    allowRating
                }
                children {
                    __typename
                    id
                    firstname
                    lastname
                    birthdate
                    phone
                    email
                    mainWalletId
                    picture
                    civility
                    isOnboardingFinished
                    isSelfOnboardingFinished
                    unregistered
                    isGift
                }
                child {
                    __typename
                    id
                    firstname
                    lastname
                    birthdate
                    phone
                    email
                    picture
                    mainWalletId
                    civility
                    isOnboardingFinished
                    isSelfOnboardingFinished
                    unregistered
                    isGift
                    allowRating
                }
            }
        }
        `
    }).then((data) => data.data.me)
}
