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
const AppError_1 = require("../../../errors/AppError");
const data_source_1 = require("../../../data-source");
const listProject_service_1 = require("../../../services/project/listProject.service");
const project_entity_1 = require("../../../entities/project.entity");
describe("listProjectService", () => {
    let findOneMock;
    beforeAll(() => {
        const projectRepository = data_source_1.AppDataSource.getRepository(project_entity_1.Project);
        findOneMock = jest.fn();
        projectRepository.findOne = findOneMock;
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should return the project when it exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockProject = { id: "1", name: "Test Project", tasks: [] };
        findOneMock.mockResolvedValue(mockProject);
        const result = yield (0, listProject_service_1.listProjectService)("1");
        expect(result).toEqual(mockProject);
        expect(findOneMock).toHaveBeenCalledTimes(1);
        expect(findOneMock).toHaveBeenCalledWith({
            where: { id: "1" },
            relations: { tasks: true },
        });
    }));
    it("should throw an error when the project does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
        findOneMock.mockResolvedValue(undefined);
        yield expect((0, listProject_service_1.listProjectService)("1")).rejects.toThrow(new AppError_1.AppError("Project not found", 404));
        expect(findOneMock).toHaveBeenCalledTimes(1);
        expect(findOneMock).toHaveBeenCalledWith({
            where: { id: "1" },
            relations: { tasks: true },
        });
    }));
});
