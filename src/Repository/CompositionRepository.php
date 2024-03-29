<?php

namespace App\Repository;

use App\Entity\Composition;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Composition>
 *
 * @method Composition|null find($id, $lockMode = null, $lockVersion = null)
 * @method Composition|null findOneBy(array $criteria, array $orderBy = null)
 * @method Composition[]    findAll()
 * @method Composition[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompositionRepository extends ServiceEntityRepository
{
    /**
     * @param ManagerRegistry $registry
     */
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Composition::class);
    }

    /**
     * @param Composition $entity
     * @param bool $flush
     * @return void
     */
    public function save(Composition $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param Composition $entity
     * @param bool $flush
     * @return void
     */

    public function remove(Composition $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @param $value
     * @return float|int|mixed|string
     */

    public function findByName($value)
    {
        return $this->getEntityManager()->createQueryBuilder()
            ->select('o')
            ->from(Composition::class, 'o')
            ->where('o.name LIKE :name')
            ->andWhere('o.isAssociated = :isAssociated')
            ->setParameters(array(
                'name' => '%'.$value.'%',
                'isAssociated' => true,
            ))
            ->orderBy('o.name', 'ASC')
            ->setMaxResults(30)
            ->getQuery()
            ->getResult();

    }

//    /**
//     * @return Composition[] Returns an array of Composition objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?Composition
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
