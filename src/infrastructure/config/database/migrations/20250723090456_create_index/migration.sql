-- DropForeignKey
ALTER TABLE "documents" DROP CONSTRAINT "documents_employeeId_fkey";

-- CreateIndex
CREATE INDEX "document_types_name_idx" ON "document_types"("name");

-- CreateIndex
CREATE INDEX "document_types_createdAt_idx" ON "document_types"("createdAt");

-- CreateIndex
CREATE INDEX "idx_documents_employee" ON "documents"("employeeId");

-- CreateIndex
CREATE INDEX "idx_documents_type" ON "documents"("documentTypeId");

-- CreateIndex
CREATE INDEX "idx_documents_status" ON "documents"("status");

-- CreateIndex
CREATE INDEX "idx_documents_employee_status" ON "documents"("employeeId", "status");

-- CreateIndex
CREATE INDEX "idx_documents_created" ON "documents"("createdAt");

-- CreateIndex
CREATE INDEX "idx_employee_hired" ON "employees"("hiredAt");

-- CreateIndex
CREATE INDEX "idx_employee_created" ON "employees"("createdAt");

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE CASCADE;
