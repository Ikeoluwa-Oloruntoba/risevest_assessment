import { Test, TestingModule } from '@nestjs/testing';

import { Comment, PrismaClient } from '@prisma/client';
import { CreateCommentDto } from 'src/features/comment/dto/createComment.dto';
import { PrismaCommentsRepository } from './comment.repo';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';

jest.mock('prisma/prisma.service'); // Mock PrismaService

describe('PrismaCommentsRepository', () => {
  let repository: PrismaCommentsRepository;
  let mockPrisma: any; // Mocked PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaClient,
        PrismaCommentsRepository,
      ],
    }).compile();

    repository = module.get<PrismaCommentsRepository>(PrismaCommentsRepository);
    mockPrisma = jest.mocked(PrismaService); // Access the mocked instance
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear all mock data after each test
  });

  // ... your tests with mocked PrismaService

  describe('create', () => {
    it('should create a new comment and return it', async () => {
      const createCommentDto: CreateCommentDto = {
          content: 'New comment',
          postId: 1,
          validate: function (): string {
              throw new Error('Function not implemented.');
          }
      };

      // Mock the behavior of PrismaService methods
      mockPrisma.comment.create.mockResolvedValueOnce({
        id: 1,
        ...createCommentDto,
        userId: 1, // Set user connection
      });

      const createdComment = await repository.create(createCommentDto, 1);

      // Assertions (unchanged)
    });

    // Add tests for error handling and edge cases
  });
});
