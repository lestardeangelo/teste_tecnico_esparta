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
const createProject_service_1 = require("../../../services/project/createProject.service");
const data_source_1 = require("../../../data-source");
const project_entity_1 = require("../../../entities/project.entity");
describe('createProjectService', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should create a new project', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = 'Project Name';
        const description = 'Project Description';
        const projectRepositoryMock = {
            findOneBy: jest.fn().mockReturnValueOnce(undefined),
            create: jest.fn().mockReturnValue({
                id: '1',
                name,
                description,
                createdAt: new Date(),
                updatedAt: new Date(),
            }),
            save: jest.fn(),
        };
        jest.spyOn(data_source_1.AppDataSource, 'getRepository').mockReturnValue(projectRepositoryMock);
        const result = yield (0, createProject_service_1.createProjectService)({ name, description });
        expect(data_source_1.AppDataSource.getRepository).toHaveBeenCalledWith(project_entity_1.Project);
        expect(projectRepositoryMock.findOneBy).toHaveBeenCalledWith({ name });
        expect(projectRepositoryMock.create).toHaveBeenCalledWith({ name, description });
        expect(projectRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ name, description }));
        expect(result).toEqual(expect.objectContaining({ name, description }));
    }));
    it('should throw an error if project name already exists', () => __awaiter(void 0, void 0, void 0, function* () {
        const name = 'Project Name';
        const description = 'Project Description';
        const projectRepositoryMock = {
            findOneBy: jest.fn().mockReturnValueOnce({}),
            create: jest.fn(),
            save: jest.fn(),
        };
        jest.spyOn(data_source_1.AppDataSource, 'getRepository').mockReturnValue(projectRepositoryMock);
        yield expect((0, createProject_service_1.createProjectService)({ name, description })).rejects.toThrow(AppError_1.AppError);
        expect(data_source_1.AppDataSource.getRepository).toHaveBeenCalledWith(project_entity_1.Project);
        expect(projectRepositoryMock.findOneBy).toHaveBeenCalledWith({ name });
        expect(projectRepositoryMock.create).not.toHaveBeenCalled();
        expect(projectRepositoryMock.save).not.toHaveBeenCalled();
    }));
});
