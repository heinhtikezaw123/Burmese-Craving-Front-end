'use client';

import React, { useEffect, useState } from 'react';
import CouponListItem from '@/components/restaurant/coupon/CouponListItem';
import CreateCouponModal from '@/components/restaurant/coupon/CreateCouponModal';
import EditCouponModal from '@/components/restaurant/coupon/EditCouponModal';
import DeleteCouponModal from '@/components/restaurant/coupon/DeleteCouponModal';
import { useGetEndpointQuery } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';

interface Coupon {
  id: number;
  title: string;
  code: string;
  minOrder: number;
  maxUses: number;
  percentage: number;
  expiredDate: string;
  status: 'Active' | 'Inactive';
  usedCount: number;

}

const Page = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState<Coupon | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const { data: coupons = [], isLoading, refetch } = useGetEndpointQuery(endpoints.coupons);

  useEffect(() => {
    console.log("coupon", coupons)
  }, [coupons])

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl">Coupon Lists</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="border border-primary text-primary bg-transparent hover:bg-primary/20 px-3 py-2 rounded"
        >
          + Create Coupon
        </button>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        {coupons.map((c) => (
          <CouponListItem
            key={c.id}
            name={c.title}
            code={c.code}
            percentage={c.percentage}
            minOrder={c.minOrder}
            maxUses={c.maxUses}
            expiredDate={c.expiredDate}
            status={c.status}
            usedCount={c.usedCount}
            onEdit={() => setEditItem(c)}
            onDelete={() => setDeleteId(c.id)}
          />
        ))}
      </div>

      <CreateCouponModal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        onCreated={() => {
          setShowCreate(false);
          refetch();
        }}
      />

      {editItem && (
        <EditCouponModal
          isOpen={!!editItem}
          onClose={() => setEditItem(null)}
          coupon={editItem}
          onUpdated={() => {
            setEditItem(null);
            refetch();
          }}
        />
      )}

      {deleteId !== null && (
        <DeleteCouponModal
          id={deleteId}
          isOpen={true}
          onClose={() => setDeleteId(null)}
          onDelete={() => {
            setDeleteId(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default Page;
