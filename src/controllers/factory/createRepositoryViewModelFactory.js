export class ICreateRepositoryViewModelFactory {
  create(dto) {}
}

export class CreateRepositoryViewModelFactory extends ICreateRepositoryViewModelFactory {
  constructor(repositoryListQuery) {
    super();
    this.repositoryListQuery = repositoryListQuery;
  }

  async create(dto) {
    const { total_count, items, pagination } =
      await this.repositoryListQuery.execute(dto);
    return {
      total_count: total_count || 0,
      items: items || [],
      pagination: pagination,
      ...dto,
    };
  }
}
