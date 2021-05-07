import QuickQuery from "./index"

test("test queries", async () => {
    const result = (QuickQuery.collection('laAccounts')
        .select(
            "id",
            "profileImageId",
            "name",
            "headline",
            "profile",
            "profileContent",
            "username",
            "counts",
            "subscriptionIds",
            "type",
            "trophies"
        )
        .whereComposite('username','EQUAL','string','ryanhornberger')
        .whereComposite('handler','EQUAL','number',22)
        .limit(80)
        .prepare()
    )
    expect(JSON.stringify(result)).toBe(`{"from":[{"collectionId":"laAccounts"}],"select":{"fields":[{"fieldPath":"id"},{"fieldPath":"profileImageId"},{"fieldPath":"name"},{"fieldPath":"headline"},{"fieldPath":"profile"},{"fieldPath":"profileContent"},{"fieldPath":"username"},{"fieldPath":"counts"},{"fieldPath":"subscriptionIds"},{"fieldPath":"type"},{"fieldPath":"trophies"}]},"where":{"compositeFilter":{"filters":[{"fieldFilter":{"field":{"fieldPath":"username"},"op":"EQUAL","value":{"stringValue":"ryanhornberger"}}},{"fieldFilter":{"field":{"fieldPath":"handler"},"op":"EQUAL","value":{"numberValue":22}}}],"op":"AND"}},"limit":80}`)
})
