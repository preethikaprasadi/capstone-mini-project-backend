import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as process from "process";
import { Student, StudentSchema } from "./model/schema/student";
import { Project, ProjectSchema } from "./model/schema/project";
import { Guide, GuideSchema } from "./model/schema/guide";
import { StudentController } from "./controller/student.controller";
import { StudentService } from "./service/student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentMapper } from "./mapper/student.mapper";
import { ProjectController } from "./controller/project.controller";
import { ProjectService } from "./service/project.service";
import { ProjectRepository } from "./repository/project.repository";
import { ProjectMapper } from "./mapper/project.mapper";
import { GuideController } from "./controller/guide.controller";
import { GuideService } from "./service/guide.service";
import { GuideRepository } from "./repository/guide.repository";
import { GuideMapper } from "./mapper/guide.mapper";
import {TechnologyController} from "./controller/technology.controller";
import {TechnologyService} from "./service/technology.service";
import {TechnologyMapper} from "./mapper/technology.mapper";
import {TechnologyRepository} from "./repository/technology.repository";
import {Technology, TechnologySchema} from "./model/schema/technology";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_HOST, {
			dbName: process.env.MONGO_DATABASE_NAME
		}),
		MongooseModule.forFeature([
			{name: Student.name, schema: StudentSchema},
			{name: Project.name, schema: ProjectSchema},
			{name: Guide.name, schema: GuideSchema},
			{name: Technology.name,schema: TechnologySchema}
		])
	],
	controllers: [
		StudentController,
		ProjectController,
		GuideController,
		TechnologyController
	],
	providers: [
		StudentService,
		StudentRepository,
		StudentMapper,
		ProjectService,
		ProjectRepository,
		ProjectMapper,
		GuideService,
		GuideRepository,
		GuideMapper,
		TechnologyService,
		TechnologyRepository,
		TechnologyMapper,
	]
})
export class AppModule {}
