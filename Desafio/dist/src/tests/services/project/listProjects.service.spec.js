"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../../data-source");
const listProjects_service_1 = require("../../../services/project/listProjects.service");
describe("listProjectsService", () => {
    let projectRepositoryMock;
    beforeEach(() => {
        projectRepositoryMock = {
            find: jest.fn(),
        };
        data_source_1.AppDataSource.getRepository = jest.fn().mockReturnValue(projectRepositoryMock);
    });
    it("should return an array of projects", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProjects = [{ id: 1, name: "Project 1" }, { id: 2, name: "Project 2" },];
        projectRepositoryMock.find.mockResolvedValue(mockProjects);
        const result = yield (0, listProjects_service_1.listProjectsService)();
        expect(result).toEqual(mockProjects);
        expect(projectRepositoryMock.find).toHaveBeenCalledTimes(1);
    }));
    it("should throw an error if repository throws an error", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockError = new Error("Repository error");
        projectRepositoryMock.find.mockRejectedValue(mockError);
        yield expect((0, listProjects_service_1.listProjectsService)()).rejects.toThrow(mockError);
        expect(projectRepositoryMock.find).toHaveBeenCalledTimes(1);
    }));
});
