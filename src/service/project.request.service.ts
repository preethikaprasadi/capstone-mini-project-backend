import {Injectable} from "@nestjs/common";
import {ProjectRequestRequestDto} from "../model/dto/request/project.request..dto.";
import {ProjectRequest} from "../model/schema/project.request";
import {ProjectRequestMapper} from "../mapper/project.request.mapper";
import {ProjectRequestRepository} from "../repository/project.request.repository";
import {ProjectRequestResponseDto} from "../model/dto/response/project.request.dto";


@Injectable()
export class ProjectRequestService {
    constructor(private readonly projectRequestMapper: ProjectRequestMapper,
                private readonly projectRequestRepository: ProjectRequestRepository) {
    }

    // public async create(guideRequestDto: GuideRequestDto): Promise<GuideResponseDto> {
    //     let guide: Guide = await this.guideMapper.guideRequestDtoToGuide(guideRequestDto);
    //     guide = await this.guideRepository.create(guide);
    //     return this.guideMapper.guideToGuideResponseDto(guide);
    // }

    public async create(projectRequestRequestDto: ProjectRequestRequestDto) {
        let projectRequest: ProjectRequest = ProjectRequestMapper.projectRequestRequestDtoToProjectRequest(projectRequestRequestDto);
        projectRequest = await this.projectRequestRepository.create(projectRequest);
        return this.projectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
    }



    public async findAll(): Promise<ProjectRequestResponseDto[]> {
        const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findAll();
        const responseDTOs: ProjectRequestResponseDto[] = await Promise.all(
            projectRequests.map(s => this.projectRequestMapper.projectRequestToProjectRequestResponseDto(s))
        );
        return responseDTOs;
    }


    public async getRequestsByGuide(guideId: string): Promise<ProjectRequestResponseDto[]> {
        const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findByGuideId(guideId);
        const responseDTOs: ProjectRequestResponseDto[] = await Promise.all(
            projectRequests.map(s => this.projectRequestMapper.projectRequestToProjectRequestResponseDto(s))
        )
        return responseDTOs;
    }


    public async getRequestsByProject(projectId: string):Promise<ProjectRequestResponseDto[]> {
        const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findByProjectId(projectId);
        const responseDTOs: ProjectRequestResponseDto[] = await Promise.all(
            projectRequests.map(s => this.projectRequestMapper.projectRequestToProjectRequestResponseDto(s))
        )
        return responseDTOs;
    }

    // public async findAll(): Promise<ProjectRequestResponseDto[]> {
    //     const projectRequests: ProjectRequest[] = await this.projectRequestRepository.findAll();
    //     return projectRequests.map(s => ProjectRequestMapper.projectRequestToProjectRequestResponseDto(s))
    // }

    public async rejectRequest(requestId: string): Promise<ProjectRequestResponseDto> {
        const projectRequest: ProjectRequest = await this.projectRequestRepository.rejectRequest(requestId);
        return this.projectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
    }

    public async acceptRequest(requestId: string): Promise<ProjectRequestResponseDto> {
        const projectRequest: ProjectRequest= await this.projectRequestRepository.acceptRequest(requestId);
       return this.projectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
         // return projectRequests.map(s => ProjectRequestMapper.projectRequestToProjectRequestResponseDto(s));

    }

    public async delete(id: string): Promise<ProjectRequestResponseDto> {
        const projectRequest: ProjectRequest = await this.projectRequestRepository.delete(id);
        console.log("Raw deleted project request:", projectRequest);

       const delItem= await this.projectRequestMapper.projectRequestToProjectRequestResponseDto(projectRequest);
        console.log("delete:(service) ", delItem);
        return delItem;
    }


}