export interface Category {
  newsCatId: number, newsCatName: string;
}

export interface News {
  newsId: number,
  newsCatId: number,
  newsCatName: string,
  newsTitle: string,
  imgUrl: string,
  authorBy: string,
  newsContent: string,
  isPublished: number,
  createdBy: string,
  createdAt: string,
  updatedBy: string,
  updatedAt: string,
  statVisit: number,
  tags: string[],
  srcNews: string, 
  srcUrl: string,
  isHeadline: number,
}