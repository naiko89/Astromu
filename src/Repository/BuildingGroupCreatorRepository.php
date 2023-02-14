<?php

namespace App\Repository;

use App\Entity\BuildingGroupCreator;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BuildingGroupCreator>
 *
 * @method BuildingGroupCreator|null find($id, $lockMode = null, $lockVersion = null)
 * @method BuildingGroupCreator|null findOneBy(array $criteria, array $orderBy = null)
 * @method BuildingGroupCreator[]    findAll()
 * @method BuildingGroupCreator[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BuildingGroupCreatorRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BuildingGroupCreator::class);
    }

    public function save(BuildingGroupCreator $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(BuildingGroupCreator $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return BuildingGroupCreator[] Returns an array of BuildingGroupCreator objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?BuildingGroupCreator
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
