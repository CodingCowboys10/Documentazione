import "reflect-metadata";
import { container } from "tsyringe";
import AWS from "aws-sdk";
import { AddDocumentController } from "@/controllers/document/AddDocumentController";
import { GetDocumentsController } from "@/controllers/document/GetDocumentsController";
import { DeleteDocumentController } from "@/controllers/document/DeleteDocumentController";
import { GetDocumentContentController } from "@/controllers/document/GetDocumentContentController";
import { DocumentRepository } from "@/infrastructure/documentRepository";
import { MinioDataSource } from "@/infrastructure/data-source/MinioDataSource";
import { AddDocumentUsecase } from "@/usecase/document/AddDocumentUsecase";
import { DeleteDocumentUsecase } from "@/usecase/document/DeleteDocumentUsecase";
import { GetDocumentContentUsecase } from "@/usecase/document/GetDocumentContentUsecase";
import { GetDocumentsUsecase } from "@/usecase/document/GetDocumentsUsecase";
import { ChromaDataSource } from "@/infrastructure/data-source/ChromaDataSource";
import { ChromaClient } from "chromadb";
import { EmbeddingRepository } from "@/infrastructure/embeddingRepository";
import { AddEmbeddingUsecase } from "@/usecase/embeddings/AddEmbeddingUsecase";

const AWSParams = {
  endpoint: process.env.AWS_ENDPOINT_URL,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3ForcePathStyle: true,
};

container.register<AWS.S3>("s3", { useValue: new AWS.S3(AWSParams) });

container.register<ChromaClient>("chromaClient", {
  useValue: new ChromaClient(),
});
container.register<ChromaDataSource>("embeddingDataSource", {
  useClass: ChromaDataSource,
});
container.register<EmbeddingRepository>("embeddingRepository", {
  useClass: EmbeddingRepository,
});
container.register<AddEmbeddingUsecase>("addEmbeddingUsecase", {
  useClass: AddEmbeddingUsecase,
});

container.register<MinioDataSource>("documentDataSource", {
  useClass: MinioDataSource,
});

container.register<DocumentRepository>("documentRepository", {
  useClass: DocumentRepository,
});

container.register<AddDocumentUsecase>("addDocUsecase", {
  useClass: AddDocumentUsecase,
});

container.register<DeleteDocumentUsecase>("delDocUsecase", {
  useClass: DeleteDocumentUsecase,
});
container.register<GetDocumentContentUsecase>("getDocContUsecase", {
  useClass: GetDocumentContentUsecase,
});
container.register<GetDocumentsUsecase>("getDocsUsecase", {
  useClass: GetDocumentsUsecase,
});

const addDocumentController = container.resolve(AddDocumentController);
const deleteDocumentController = container.resolve(DeleteDocumentController);
const getDocumentsController = container.resolve(GetDocumentsController);
const getDocumentContentController = container.resolve(
  GetDocumentContentController,
);

export {
  addDocumentController,
  deleteDocumentController,
  getDocumentsController,
  getDocumentContentController,
};
