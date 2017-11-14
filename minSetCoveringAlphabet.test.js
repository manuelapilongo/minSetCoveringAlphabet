
const alphabet = "abcdefghijklmnopqrstuvwxyz";

describe("Core Algorithm", () => {
    const minSetCoveringAlphabet = require("./minSetCoveringAlphabet.js");
    it("Matches a single subset same as the whole alphabet", () => {
        expect(minSetCoveringAlphabet.processData(["abcdefghijklmnopqrstuvwxyz"]))
            .toEqual(["abcdefghijklmnopqrstuvwxyz"]);
    });

    it("Excludes subsets with testset 1", () => {
        const mockDataRows = [
            "abcb",
            "ab",
            "abc",
            "abde",
            "adf",
            "dfje",
            "ghijklmnopqrstuvwxyz",
        ];
        expect(minSetCoveringAlphabet.processData(mockDataRows))
            .toEqual([
                "ghijklmnopqrstuvwxyz",
                "abcb",
                "abde",
                "adf",
            ]);
    });
    it("Excludes subsets with testset 2", () => {
        const mockDataRows = [
            "abcb",
            "abcdefg",
            "abc",
            "abde",
            "adf",
            "dfje",
            "ghijklmnopqrstuvwxyz",
        ];
        expect(minSetCoveringAlphabet.processData(mockDataRows))
            .toEqual(["ghijklmnopqrstuvwxyz", "abcdefg"]);
    });
    it("Excludes subsets with testset formed by all letters of the alphabet", () => {
        const mockDataRows = [
            'a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r',
            's', 't', 'u', 'v', 'w', 'x',
            'y', 'z' ];
        expect(minSetCoveringAlphabet.processData(mockDataRows))
            .toEqual(mockDataRows);
    });
});
